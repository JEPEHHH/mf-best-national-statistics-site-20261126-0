// Screenshot tool: drives the cached headless Chromium over CDP using Node's
// built-in WebSocket. Not part of the handed-in app; only used by the maker.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const CHROME = '/home/ubuntu/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome';
const PORT = 9333;
const url = (p) => `http://localhost:9334/#/${p}`;
const shots = [
  { name: '1-overview.jpg', path: 'overview', w: 1280, h: 800, scroll: 0 },
  { name: '2-economy.jpg', path: 'economy', w: 1280, h: 800, scroll: 480 },
  { name: '3-regions.jpg', path: 'regions', w: 1280, h: 800, scroll: 700 },
  { name: '4-phone-overview.jpg', path: 'overview', w: 390, h: 844, scroll: 0 }
];

const chrome = spawn(CHROME, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, '--user-data-dir=/tmp/nusa-cdp-profile',
  '--window-size=1280,800', 'about:blank'
], { stdio: 'ignore' });
await sleep(1500);

const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then(r => r.json());
const page = list.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
function send(method, params = {}) {
  const n = ++id;
  ws.send(JSON.stringify({ id: n, method, params }));
  return new Promise(r => pending.set(n, r));
}
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

await send('Page.enable');
await send('Runtime.enable');
mkdirSync('screenshots', { recursive: true });
for (const shot of shots) {
  await send('Emulation.setDeviceMetricsOverride', { width: shot.w, height: shot.h, deviceScaleFactor: 1, mobile: shot.w < 500 });
  await send('Page.navigate', { url: url(shot.path) });
  await sleep(1400);
  await send('Runtime.evaluate', { expression: `window.scrollTo(0,${shot.scroll})` });
  await sleep(350);
  const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82, captureBeyondViewport: false });
  const buf = Buffer.from(r.result.data, 'base64');
  writeFileSync(`screenshots/${shot.name}`, buf);
  console.log(shot.name, buf.length, 'bytes');
}
ws.close();
chrome.kill();
