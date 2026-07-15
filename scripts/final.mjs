import { chromium } from "playwright";
const b = await chromium.launch();
// desktop visit
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto("http://localhost:3210",{waitUntil:"networkidle"});
await p.waitForTimeout(1500);
await p.evaluate(()=>{const e=document.getElementById("visit"); scrollTo(0, e.getBoundingClientRect().top+scrollY-30);});
await p.waitForTimeout(900);
await p.screenshot({ path:"/tmp/rev/visit-new.png" });
await p.close();
// mobile full pass at 390
const m = await b.newPage({ viewport:{width:390,height:844} });
await m.goto("http://localhost:3210",{waitUntil:"networkidle"});
await m.waitForTimeout(1500);
await m.screenshot({ path:"/tmp/rev/m-hero.png" });
await m.evaluate(()=>{const e=document.getElementById("full-menu"); scrollTo(0, e.getBoundingClientRect().top+scrollY-10);});
await m.waitForTimeout(800);
await m.screenshot({ path:"/tmp/rev/m-menu.png" });
await m.close();
await b.close(); console.log("done");
