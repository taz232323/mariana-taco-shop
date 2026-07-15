import { chromium } from "playwright";
const b = await chromium.launch();
const sizes = [[390,844],[430,932],[375,667]];
for (const [w,h] of sizes) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  const data = await p.evaluate(() => {
    const docH = document.body.scrollHeight;
    const vw = window.innerWidth;
    const overflow = document.documentElement.scrollWidth > vw + 1;
    const menu = document.getElementById("menu");
    const fullMenu = document.getElementById("full-menu");
    const rectTop = (el) => el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
    return {
      docH,
      screens: +(docH / window.innerHeight).toFixed(1),
      overflow,
      scrollW: document.documentElement.scrollWidth,
      vw,
      menuTop: rectTop(menu),
      fullMenuTop: rectTop(fullMenu),
      menuScreensDown: menu ? +((rectTop(menu))/window.innerHeight).toFixed(2) : null,
    };
  });
  console.log(`\n${w}x${h}:`, JSON.stringify(data));
  await p.close();
}
await b.close();
