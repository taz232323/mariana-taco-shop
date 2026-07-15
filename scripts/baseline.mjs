import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const total = await p.evaluate(() => document.body.scrollHeight - innerHeight);
const stops = [0, .1, .22, .34, .46, .6, .74, .88, 1];
for (let i=0;i<stops.length;i++){
  await p.evaluate(y=>scrollTo(0,y), Math.round(total*stops[i]));
  await p.waitForTimeout(700);
  await p.screenshot({ path:`/tmp/base/d-${String(i).padStart(2,"0")}.png` });
}
await b.close(); console.log("desktop done");
