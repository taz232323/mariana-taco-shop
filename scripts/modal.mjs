import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3210", { waitUntil: "networkidle" });
// scroll to menu and open first favorite card
await p.evaluate(() => document.getElementById("menu")?.scrollIntoView());
await p.waitForTimeout(1200);
await p.$$eval(".menu-card", els => els[0].click());
await p.waitForTimeout(600);
await p.screenshot({ path: "/tmp/mariana-shots/modal-desktop.png" });
console.log("modal captured");
await b.close();
