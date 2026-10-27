import { expect, test, type Page } from "@playwright/test";

// Estado dos <audio> que o Remotion cria para cada vídeo.
const audios = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll("audio")]
      .filter((a) => a.currentSrc.includes("/audio/"))
      .map((a) => ({ src: a.currentSrc.split("/").pop()!, audible: !a.muted && !a.paused })),
  );

test.describe("som dos vídeos", () => {
  test.skip(({ browserName }) => browserName !== "chromium");

  test("só um vídeo toca com som por vez", async ({ page }) => {
    await page.goto("/pt-BR");
    const buttons = page.getByRole("button", { name: "Ouvir com som" });

    await buttons.first().scrollIntoViewIfNeeded();
    await buttons.first().click();
    await expect.poll(async () => (await audios(page)).filter((a) => a.audible).map((a) => a.src)).toEqual(["documentario.mp3"]);

    // ativa o som do estudo de caso: o documentário precisa silenciar
    await page.locator("#bastidores").scrollIntoViewIfNeeded();
    await page.locator("#bastidores").getByRole("button", { name: "Ouvir com som" }).click();
    await expect.poll(async () => (await audios(page)).filter((a) => a.audible).map((a) => a.src)).toEqual(["bastidores-apps.mp3"]);
    await expect(page.getByRole("button", { name: "Ouvir com som" }).first()).toBeVisible(); // botão do documentário voltou ao estado sem som
  });

  test("vídeo fora da tela pausa e volta a tocar ao reaparecer", async ({ page }) => {
    await page.goto("/pt-BR");
    const btn = page.getByRole("button", { name: "Ouvir com som" }).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await expect.poll(async () => (await audios(page)).some((a) => a.src === "documentario.mp3" && a.audible)).toBe(true);

    await page.locator("#contato").scrollIntoViewIfNeeded();
    await expect.poll(async () => (await audios(page)).some((a) => a.audible)).toBe(false);

    // centraliza o player (o código retoma com 35% dele visível)
    await page.getByRole("region", { name: /Vídeo sobre a trajetória/ }).evaluate((el) => el.scrollIntoView({ block: "center" }));
    await expect.poll(async () => (await audios(page)).some((a) => a.src === "documentario.mp3" && a.audible)).toBe(true);
  });
});
