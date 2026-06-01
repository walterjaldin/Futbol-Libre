import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = new URL("../evidencias/cdp/", import.meta.url).pathname;
const profileDir = join(outDir, "chrome-profile");
const downloadDir = join(outDir, "downloads");
const port = 9223 + Math.floor(Math.random() * 2000);

await rm(outDir, { recursive: true, force: true });
await mkdir(downloadDir, { recursive: true });

const chrome = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  "--headless=new",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-sync",
  "--disable-extensions",
  "--disable-background-networking",
  "--autoplay-policy=no-user-gesture-required",
  "--window-size=1280,720",
  "about:blank",
], { stdio: ["ignore", "pipe", "pipe"] });

const cleanup = async () => {
  chrome.kill("SIGTERM");
  await delay(500).catch(() => {});
  chrome.kill("SIGKILL");
};

const waitForJson = async (path) => {
  const url = `http://127.0.0.1:${port}${path}`;
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {}
    await delay(250);
  }
  throw new Error(`Chrome DevTools no disponible en ${url}`);
};

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    this.ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result ?? {});
      } else if (msg.method) {
        this.events.push({ ts: Date.now(), ...msg });
      }
    });
  }

  async open() {
    while (this.ws.readyState === WebSocket.CONNECTING) await delay(50);
  }

  close() {
    try { this.ws.close(); } catch {}
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`Timeout CDP: ${method}`));
        }
      }, 15000);
    });
  }
}

const summarizeEvents = (events) => {
  const requests = [];
  const responses = [];
  const downloads = [];
  const popups = [];
  const consoleEntries = [];

  for (const ev of events) {
    if (ev.method === "Network.requestWillBeSent") {
      requests.push({
        url: ev.params.request.url,
        method: ev.params.request.method,
        type: ev.params.type,
        initiator: ev.params.initiator?.type,
        documentURL: ev.params.documentURL,
      });
    }
    if (ev.method === "Network.responseReceived") {
      responses.push({
        url: ev.params.response.url,
        status: ev.params.response.status,
        mimeType: ev.params.response.mimeType,
        remoteIPAddress: ev.params.response.remoteIPAddress,
        type: ev.params.type,
        headers: {
          location: ev.params.response.headers?.location || ev.params.response.headers?.Location,
          contentDisposition: ev.params.response.headers?.["content-disposition"] || ev.params.response.headers?.["Content-Disposition"],
          contentType: ev.params.response.headers?.["content-type"] || ev.params.response.headers?.["Content-Type"],
        },
      });
    }
    if (ev.method === "Page.windowOpen") {
      popups.push(ev.params);
    }
    if (ev.method === "Browser.downloadWillBegin" || ev.method === "Page.downloadWillBegin") {
      downloads.push(ev.params);
    }
    if (ev.method === "Runtime.consoleAPICalled") {
      consoleEntries.push({
        type: ev.params.type,
        args: ev.params.args?.map((arg) => arg.value ?? arg.description).join(" "),
      });
    }
  }

  const domains = [...new Set(requests.map((r) => {
    try { return new URL(r.url).hostname; } catch { return null; }
  }).filter(Boolean))].sort();

  return { domains, requests, responses, popups, downloads, consoleEntries };
};

try {
  const version = await waitForJson("/json/version");
  const browser = new CDP(version.webSocketDebuggerUrl);
  await browser.open();
  await browser.send("Target.setDiscoverTargets", { discover: true });

  const targets = await waitForJson("/json");
  const pageTarget = targets.find((t) => t.type === "page");
  const page = new CDP(pageTarget.webSocketDebuggerUrl);
  await page.open();

  await page.send("Page.enable");
  await page.send("Network.enable");
  await page.send("Runtime.enable");
  await page.send("Target.setDiscoverTargets", { discover: true }).catch(() => {});
  await page.send("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadDir,
    eventsEnabled: true,
  }).catch(() => {});

  await page.send("Page.navigate", { url: "https://futbol-libre.su/espn-1/" });
  await page.send("Page.loadEventFired").catch(() => {});
  await delay(8000);

  const iframeClients = [];
  const loadedTargets = await waitForJson("/json");
  for (const target of loadedTargets.filter((t) => t.type === "iframe" && t.webSocketDebuggerUrl)) {
    const client = new CDP(target.webSocketDebuggerUrl);
    await client.open();
    await client.send("Page.enable").catch(() => {});
    await client.send("Network.enable").catch(() => {});
    await client.send("Runtime.enable").catch(() => {});
    iframeClients.push({ target, client });
  }

  const preClick = await page.send("Runtime.evaluate", {
    expression: `JSON.stringify({
      url: location.href,
      title: document.title,
      iframes: Array.from(document.querySelectorAll('iframe')).map(f => ({
        src: f.src,
        rect: (() => { const r = f.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; })()
      })),
      anchors: Array.from(document.querySelectorAll('a[href]')).map(a => ({text:(a.innerText||'').trim(), href:a.href})).slice(0,50)
    })`,
    returnByValue: true,
  });

  await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 640, y: 388, button: "none" });
  await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: 640, y: 388, button: "left", clickCount: 1 });
  await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 640, y: 388, button: "left", clickCount: 1 });
  await delay(10000);

  const allTargets = await waitForJson("/json");
  const afterClickTargets = allTargets.map((t) => ({ id: t.id, type: t.type, url: t.url, title: t.title }));

  const result = {
    generatedAt: new Date().toISOString(),
    chromeProfile: profileDir,
    downloadDir,
    preClick: JSON.parse(preClick.result.value),
    afterClickTargets,
    pageEvents: summarizeEvents(page.events),
    iframeEvents: iframeClients.map(({ target, client }) => ({
      target: { id: target.id, url: target.url, title: target.title, type: target.type },
      events: summarizeEvents(client.events),
    })),
    browserEvents: browser.events,
  };

  await writeFile(join(outDir, "probe-result.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({
    out: join(outDir, "probe-result.json"),
    domains: result.pageEvents.domains,
    iframeDomains: result.iframeEvents.map((entry) => entry.events.domains),
    popups: result.pageEvents.popups,
    downloads: result.pageEvents.downloads,
    targets: afterClickTargets,
  }, null, 2));
  page.close();
  for (const { client } of iframeClients) client.close();
  browser.close();
} finally {
  await cleanup();
  process.exit(0);
}
