import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
await p.waitForTimeout(900);
const shot = async (y, name) => { await p.evaluate(yy=>window.scrollTo(0,yy), y); await p.waitForTimeout(700); await p.screenshot({path:`/tmp/mariana-shots/m-${name}.png`}); };
await shot(0, "01-hero");
await shot(560, "02-quick-fav");
await shot(1750, "03-build");   // build section (order-4, after menu)
await b.close();
console.log("done");
