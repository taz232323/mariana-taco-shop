import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:390,height:844} });
await p.goto("http://localhost:3210",{waitUntil:"networkidle"});
await p.waitForTimeout(900);
await p.evaluate(()=>document.getElementById("build")?.scrollIntoView());
await p.waitForTimeout(600);
// programmatically scroll carousel to 3rd card and dispatch scroll
const res = await p.evaluate(async () => {
  const car = document.querySelector('[aria-label="Build the bite stages"]');
  const card = car.querySelector("article");
  const stride = card.offsetWidth + 16;
  car.scrollLeft = stride * 2; // -> index 2 (Veggies)
  car.dispatchEvent(new Event("scroll"));
  await new Promise(r=>setTimeout(r,400));
  const dots = [...car.parentElement.querySelectorAll("button[aria-label^='Go to']")];
  const widths = dots.map(d=>d.getBoundingClientRect().width);
  return { activeIndex: widths.indexOf(Math.max(...widths)), widths };
});
console.log("after scroll to card 2 ->", JSON.stringify(res));
await b.close(); console.log("done");
