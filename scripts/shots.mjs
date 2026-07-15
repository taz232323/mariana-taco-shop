import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.env.BASE || "http://localhost:3210";
const OUT = "/tmp/mariana-shots";
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

// Fractions of total scrollable height to capture.
const scrollStops = [0, 0.12, 0.26, 0.4, 0.55, 0.72, 0.88, 1];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const total = await page.evaluate(
    () => document.body.scrollHeight - window.innerHeight
  );

  for (let i = 0; i < scrollStops.length; i++) {
    const y = Math.round(total * scrollStops[i]);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(900);
    const n = String(i).padStart(2, "0");
    await page.screenshot({ path: `${OUT}/${vp.name}-${n}.png` });
  }
  await page.close();
  console.log(`captured ${vp.name}`);
}
await browser.close();
console.log("done ->", OUT);
