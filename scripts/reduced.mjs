import { chromium } from "playwright";
const b = await chromium.launch();
for (const vp of [{n:"desktop",w:1440,h:900},{n:"mobile",w:390,h:844}]) {
  const p = await b.newPage({ viewport: { width: vp.w, height: vp.h } });
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `/tmp/mariana-shots/reduced-${vp.n}.png` });
  // sanity: hero image present & visible, no hidden content
  const heroVisible = await p.$eval("h1", el => getComputedStyle(el).opacity);
  console.log(`${vp.n}: h1 opacity=${heroVisible}`);
  await p.close();
}
await b.close();
console.log("reduced done");
