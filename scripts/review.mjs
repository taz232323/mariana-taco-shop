import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
// jump to specific sections by id for clean framing
const shoot = async (id, name, extra=0) => {
  await p.evaluate((args)=>{ const el=document.getElementById(args.id); if(el){ const y=el.getBoundingClientRect().top+scrollY+args.extra; scrollTo(0,y);} }, {id, extra});
  await p.waitForTimeout(1000);
  await p.screenshot({ path:`/tmp/rev/${name}.png` });
};
await shoot("craving","craving",-40);
await shoot("story","story",-40);
await shoot("menu","menu",-40);
await shoot("reviews","reviews",-40);
await shoot("visit","visit",-40);
await b.close(); console.log("done");
