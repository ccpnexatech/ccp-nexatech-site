import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3200);

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 768 } }, testMatch: /layout\.spec/ },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: { command: `npx next start -p ${PORT}`, port: PORT, reuseExistingServer: !process.env.CI, timeout: 120_000 },
});
