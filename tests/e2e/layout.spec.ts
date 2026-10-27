import { expect, test } from "@playwright/test";

// Sem rolagem horizontal em larguras intermediárias (o mapa de calor já quebrou isso em 1024 px).
for (const width of [1024, 1280, 768, 390]) {
  test(`sem rolagem horizontal em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/pt-BR");
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 700) await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
