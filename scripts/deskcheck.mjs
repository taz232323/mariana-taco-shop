import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
await p.waitForTimeout(900);
// section order on desktop (top positions)
const order = await p.evaluate(() => {
  const ids = ["top","craving","build","menu","visit","final"];
  return ids.map(id => {
    const el = document.getElementById(id);
    return { id, top: el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : "MISSING" };
  });
});
console.log("Desktop section order:", JSON.stringify(order));
const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
console.log("overflow:", overflow);
await p.screenshot({ path: "/tmp/mariana-shots/d-top.png" });
// scroll into the pinned build section
await p.evaluate(() => document.getElementById("build")?.scrollIntoView());
await p.waitForTimeout(500);
await p.evaluate(() => window.scrollBy(0, 400));
await p.waitForTimeout(600);
await p.screenshot({ path: "/tmp/mariana-shots/d-build.png" });
await b.close();
console.log("done");
