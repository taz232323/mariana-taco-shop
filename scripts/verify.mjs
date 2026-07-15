import { chromium } from "playwright";
const b = await chromium.launch();
const sizes = [[1440,900,"desktop"],[390,844,"m390"],[430,932,"m430"],[375,667,"m375"]];
for (const [w,h,name] of sizes) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  await p.goto("http://localhost:3210",{waitUntil:"networkidle"});
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 1;
    const menu = document.getElementById("full-menu");
    const menuTop = menu ? Math.round(menu.getBoundingClientRect().top+scrollY) : null;
    const orderLinks = [...document.querySelectorAll('a[href]')].filter(a=>/order/i.test(a.href)).map(a=>a.href);
    const badOrder = orderLinks.filter(h=>h!=="https://www.marianastacoshoptx.com/order");
    const reviewLinks = [...document.querySelectorAll('a[href]')].filter(a=>/google\.com\/search/.test(a.href)).length;
    return { overflow, scrollW: document.documentElement.scrollWidth, vw: window.innerWidth,
      docH: document.body.scrollHeight, menuScreens: menu? +(menuTop/window.innerHeight).toFixed(2):null,
      orderCount: orderLinks.length, badOrder, reviewLinks };
  });
  console.log(`${name} ${w}x${h}:`, JSON.stringify(r));
  await p.close();
}
await b.close(); console.log("verify done");
