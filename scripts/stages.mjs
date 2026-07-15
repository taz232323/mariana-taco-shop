import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
await p.waitForTimeout(1000);
// find the build section top and its pinned scroll range
const buildTop = await p.evaluate(() => {
  const el = document.getElementById("build");
  window.scrollTo(0, 0);
  return el.getBoundingClientRect().top + window.scrollY;
});
// step through the pinned range (section is ~3x viewport once pinned)
const seen = [];
for (let i = 0; i <= 24; i++) {
  const y = buildTop + i * 120; // 120px increments through the pin
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(180);
  const label = await p.evaluate(() => {
    const cap = document.querySelector(".build-caption .display");
    const num = document.querySelector(".build-caption .text-lime");
    return cap ? `${num?.textContent?.trim()} ${cap.textContent.trim()}` : null;
  });
  if (label && seen[seen.length-1] !== label) seen.push(label);
}
console.log("Stages seen in order:");
seen.forEach(s => console.log("  " + s));
await b.close();
