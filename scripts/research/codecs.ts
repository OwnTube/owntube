import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const p = await b.newPage();
await p.goto("http://localhost:8080/robots.txt");
console.log(await p.evaluate(() => Object.fromEntries(['video/mp4; codecs="avc1.4d401e"','audio/mp4; codecs="mp4a.40.2"','video/webm; codecs="vp9"','video/webm; codecs="vp09.00.30.08"','audio/webm; codecs="opus"','video/mp4; codecs="av01.0.05M.08"','video/mp4; codecs="vp09.00.30.08"', 'audio/mp4; codecs="opus"'].map(t=>[t, MediaSource.isTypeSupported(t)]))));
await b.close();
