import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PT = "/pt-BR";
const EN = "/en";

async function scrollThrough(page: Page) {
  // dispara as animações de entrada (whileInView) antes da auditoria
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 700) await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function axe(page: Page) {
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).exclude("#vlibras-root").analyze();
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`);
}

test.describe("acessibilidade (axe, WCAG 2.2 AA)", () => {
  for (const mode of ["normal", "high", "dark"] as const) {
    test(`sem violações no modo ${mode}`, async ({ page }) => {
      await page.addInitScript((m) => localStorage.setItem("caio-a11y", JSON.stringify({ contrast: m, motion: "reduced" })), mode);
      await page.goto(PT);
      await scrollThrough(page);
      expect(await axe(page)).toEqual([]);
    });
  }

  test("sem violações em inglês", async ({ page }) => {
    await page.goto(EN);
    await scrollThrough(page);
    expect(await axe(page)).toEqual([]);
  });

  test("sem violações com o painel de acessibilidade aberto", async ({ page }) => {
    await page.goto(PT);
    await page.getByRole("button", { name: "Acessibilidade", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Opções de acessibilidade" })).toBeVisible();
    expect(await axe(page)).toEqual([]);
  });
});

test.describe("teclado", () => {
  test("primeiro Tab vai para o atalho do conteúdo", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium");
    await page.goto(PT);
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveText(/Ir para o conteúdo/);
  });

  test("Alt+3 leva ao contato e Alt+1 ao conteúdo", async ({ page }) => {
    await page.goto(PT);
    await page.keyboard.press("Alt+3");
    await expect(page.locator("#contato")).toBeFocused();
    await page.keyboard.press("Alt+1");
    await expect(page.locator("#conteudo")).toBeFocused();
  });

  test("Esc fecha o painel e devolve o foco ao botão", async ({ page }) => {
    await page.goto(PT);
    const opener = page.getByRole("button", { name: "Acessibilidade", exact: true });
    await opener.click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(opener).toBeFocused();
  });
});

test.describe("preferências", () => {
  test("tamanho do texto aumenta a fonte raiz e persiste após recarregar", async ({ page }) => {
    await page.goto(PT);
    const size = () => page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
    const base = await size();
    await page.getByRole("button", { name: "Aumentar texto" }).first().click();
    await expect.poll(size).toBeGreaterThan(base);
    await page.reload();
    await expect.poll(size).toBeGreaterThan(base);
    await expect(page.locator("html")).toHaveAttribute("data-font", "1");
  });

  test("modos de contraste e interruptores refletem o estado (aria)", async ({ page }) => {
    await page.goto(PT);
    await page.getByRole("button", { name: "Acessibilidade", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("radio", { name: "Alto contraste" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
    await dialog.getByRole("radio", { name: "Escuro" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).not.toHaveAttribute("data-contrast", "high");
    const legible = dialog.getByRole("switch", { name: "Fonte de alta legibilidade" });
    await legible.click();
    await expect(legible).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("html")).toHaveAttribute("data-legible", "on");
    await dialog.getByRole("button", { name: "Restaurar padrões" }).click();
    await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
  });

  test("reduzir movimento marca a página e é respeitado pelo sistema", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(PT);
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    await ctx.close();
  });
});

test.describe("conteúdo", () => {
  test("contato é pelo LinkedIn e nenhum e-mail aparece", async ({ page }) => {
    await page.goto(PT);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    expect(await page.locator("body").innerText()).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    await expect(page.locator("#contato").getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", /linkedin\.com\/in\/caio-cesar-ponte/);
  });

  test("página em inglês não tem textos em português da interface", async ({ page }) => {
    await page.goto(EN);
    const text = await page.locator("body").innerText();
    for (const pt of ["Ir para o conteúdo", "Acessibilidade", "Competências", "Projetos na empresa", "Rotina de trabalho", "Contato"]) expect(text).not.toContain(pt);
  });

  test("sem rolagem horizontal", async ({ page }) => {
    await page.goto(PT);
    await scrollThrough(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test("player começa sem som e o botão ativa o som", async ({ page }) => {
    await page.goto(PT);
    const btn = page.getByRole("button", { name: "Ouvir com som" }).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await expect(page.getByRole("button", { name: "Desativar som" }).first()).toBeVisible();
  });
});
