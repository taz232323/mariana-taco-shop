import { chromium } from "playwright";
const b = await chromium.launch();
// Mobile build carousel + swipe
const p = await b.newPage({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true });
await p.goto("http://localhost:3210",{waitUntil:"networkidle"});
await p.waitForTimeout(1000);
await p.evaluate(()=>document.getElementById("build")?.scrollIntoView());
await p.waitForTimeout(800);
await p.screenshot({ path:"/tmp/rev/mbuild-1.png" });
// swipe the carousel left twice
const car = await p.$('[aria-label="Build the bite stages"]');
const box = await car.boundingBox();
for (let k=0;k<2;k++){
  await p.mouse.move(box.x+box.width*0.8, box.y+box.height*0.5);
  await p.mouse.down();
  await p.mouse.move(box.x+box.width*0.15, box.y+box.height*0.5, {steps:12});
  await p.mouse.up();
  await p.waitForTimeout(700);
}
await p.screenshot({ path:"/tmp/rev/mbuild-2.png" });
await p.close();
// reduced motion desktop
const r = await b.newPage({ viewport:{width:1440,height:900} });
await r.emulateMedia({ reducedMotion:"reduce" });
await r.goto("http://localhost:3210",{waitUntil:"networkidle"});
await r.waitForTimeout(1000);
await r.evaluate(()=>document.getElementById("story")?.scrollIntoView());
await r.waitForTimeout(600);
const storyVisible = await r.evaluate(()=>{
  const img = document.querySelector(".panel-frame");
  return img ? getComputedStyle(img).clipPath : "none";
});
console.log("reduced story clipPath:", storyVisible);
await r.screenshot({ path:"/tmp/rev/reduced-story.png" });
await r.close();
await b.close(); console.log("verify2 done");
