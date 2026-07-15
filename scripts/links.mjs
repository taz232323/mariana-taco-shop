import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
// Every anchor with an href and its destination
const anchors = await p.$$eval("a[href]", els => els.map(e => ({
  text: (e.textContent||"").trim().replace(/\s+/g," ").slice(0,28),
  href: e.getAttribute("href"),
})));
const ext = anchors.filter(a => /^https?:\/\//.test(a.href) && !a.href.includes("localhost"));
console.log("EXTERNAL LINKS (should be only Order / Directions):");
ext.forEach(a => console.log(`  [${a.text}] -> ${a.href}`));
const tel = anchors.filter(a => a.href.startsWith("tel:"));
console.log("TEL LINKS:", tel.map(a=>a.href));
// Confirm favorite cards are buttons, not links
const cards = await p.$$eval(".menu-card", els => els.map(e => e.tagName));
console.log("menu-card tags:", cards);
await b.close();
