import { chromium } from "playwright";
const b = await chromium.launch();
// Desktop: capture salsa (stage 4) and finished (stage 5)
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
const buildTop = await p.evaluate(() => {
  const el = document.getElementById("build");
  return el.getBoundingClientRect().top + window.scrollY;
});
async function shootAtLabel(target, name) {
  for (let i = 0; i <= 30; i++) {
    await p.evaluate((yy) => window.scrollTo(0, yy), buildTop + i * 90);
    await p.waitForTimeout(140);
    const lbl = await p.evaluate(() => document.querySelector(".build-caption .display")?.textContent?.trim());
    if (lbl === target) { await p.waitForTimeout(500); await p.screenshot({ path: `/tmp/mariana-shots/build-${name}.png` }); return true; }
  }
  return false;
}
console.log("salsa:", await shootAtLabel("Salsa", "salsa"));
console.log("finished:", await shootAtLabel("The finished bite", "finished"));
await p.close();
// Mobile story
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3210", { waitUntil: "networkidle" });
await m.evaluate(() => document.getElementById("build")?.scrollIntoView());
await m.waitForTimeout(1000);
await m.screenshot({ path: "/tmp/mariana-shots/build-mobile.png" });
console.log("mobile captured");
await b.close();
