import { chromium } from "playwright";
const b = await chromium.launch();
// Build stepper at 390
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
await p.evaluate(() => document.getElementById("build")?.scrollIntoView());
await p.waitForTimeout(700);
await p.screenshot({ path: "/tmp/mariana-shots/m-04-build.png" });
// tap a later chip (Salsa) to confirm switch
const chips = await p.$$('#build button[aria-pressed]');
if (chips[3]) { await chips[3].click(); await p.waitForTimeout(600); await p.screenshot({ path: "/tmp/mariana-shots/m-05-build-salsa.png" }); }
await p.close();
// 375 bottom to check footer/bar clearance + no overlap
const s = await b.newPage({ viewport: { width: 375, height: 667 } });
await s.goto("http://localhost:3210", { waitUntil: "networkidle" });
await s.waitForTimeout(700);
await s.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await s.waitForTimeout(700);
await s.screenshot({ path: "/tmp/mariana-shots/m-06-375-bottom.png" });
await b.close();
console.log("done");
