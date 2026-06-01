import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = new URL("..", import.meta.url).pathname;

const scenarios = {
  futbol_home_desktop: {
    url: "https://futbol-libre.su/",
    out: "evidencias/extended/futbol_home_desktop",
    waitMs: 10000,
  },
  futbol_espn_desktop_click: {
    url: "https://futbol-libre.su/espn-1/",
    out: "evidencias/extended/futbol_espn_desktop_click",
    waitMs: 9000,
    click: { x: 640, y: 388 },
    afterClickWaitMs: 12000,
  },
  futbol_espn_mobile_click: {
    url: "https://futbol-libre.su/espn-1/",
    out: "evidencias/extended/futbol_espn_mobile_click",
    waitMs: 9000,
    click: { x: 190, y: 260 },
    afterClickWaitMs: 12000,
    mobile: true,
  },
  doradobet_home_desktop: {
    url: "https://doradobet.com/",
    out: "evidencias/extended/doradobet_home_desktop",
    waitMs: 18000,
  },
  doradobet_home_mobile: {
    url: "https://doradobet.com/",
    out: "evidencias/extended/doradobet_home_mobile",
    waitMs: 18000,
    mobile: true,
  },
  doradobet_register_desktop: {
    url: "https://doradobet.com/registro",
    out: "evidencias/extended/doradobet_register_desktop",
    waitMs: 18000,
  },
  doradobet_pwa_mobile: {
    url: "https://doradobet.com/landing/app-pwa",
    out: "evidencias/extended/doradobet_pwa_mobile",
    waitMs: 18000,
    mobile: true,
  },
};

const scenarioName = process.argv[2];
if (!scenarioName || !scenarios[scenarioName]) {
  console.error(`Uso: node tools/site_probe.mjs <scenario>\nEscenarios: ${Object.keys(scenarios).join(", ")}`);
  process.exit(2);
}

const scenario = scenarios[scenarioName];
const outDir = join(ROOT, scenario.out);
const profileDir = join(outDir, "chrome-profile");
const downloadDir = join(outDir, "downloads");
const port = 11000 + Math.floor(Math.random() * 3000);
const width = scenario.mobile ? 390 : 1280;
const height = scenario.mobile ? 844 : 720;

await rm(outDir, { recursive: true, force: true });
await mkdir(downloadDir, { recursive: true });

const chromeArgs = [
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  "--headless=new",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-sync",
  "--disable-extensions",
  "--disable-background-networking",
  "--autoplay-policy=no-user-gesture-required",
  `--window-size=${width},${height}`,
  "about:blank",
];

if (scenario.mobile) {
  chromeArgs.push("--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1");
}

const chrome = spawn(chromePath, chromeArgs, { stdio: ["ignore", "pipe", "pipe"] });

const waitForJson = async (path) => {
  const url = `http://127.0.0.1:${port}${path}`;
  for (let i = 0; i < 100; i++) {
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
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result ?? {});
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
      }, 20000);
    });
  }
}

const summarizeEvents = (events) => {
  const requests = [];
  const responses = [];
  const popups = [];
  const downloads = [];
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
          contentType: ev.params.response.headers?.["content-type"] || ev.params.response.headers?.["Content-Type"],
          contentDisposition: ev.params.response.headers?.["content-disposition"] || ev.params.response.headers?.["Content-Disposition"],
        },
      });
    }
    if (ev.method === "Page.windowOpen") popups.push(ev.params);
    if (ev.method === "Browser.downloadWillBegin" || ev.method === "Page.downloadWillBegin") downloads.push(ev.params);
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

const safeEval = async (page, expression) => {
  try {
    const result = await page.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    return result.result?.value ?? null;
  } catch (e) {
    return { error: String(e) };
  }
};

try {
  const version = await waitForJson("/json/version");
  const browser = new CDP(version.webSocketDebuggerUrl);
  await browser.open();
  const targets = await waitForJson("/json");
  const pageTarget = targets.find((t) => t.type === "page");
  const page = new CDP(pageTarget.webSocketDebuggerUrl);
  await page.open();

  await page.send("Page.enable");
  await page.send("Network.enable");
  await page.send("Runtime.enable");
  await page.send("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadDir,
    eventsEnabled: true,
  }).catch(() => {});
  if (scenario.mobile) {
    await page.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 3,
      mobile: true,
    }).catch(() => {});
    await page.send("Emulation.setTouchEmulationEnabled", { enabled: true }).catch(() => {});
  }

  await page.send("Page.navigate", { url: scenario.url });
  await delay(scenario.waitMs);

  const attachIframeClients = async () => {
    const found = await waitForJson("/json");
    const clients = [];
    for (const target of found.filter((t) => t.type === "iframe" && t.webSocketDebuggerUrl)) {
      const client = new CDP(target.webSocketDebuggerUrl);
      await client.open();
      await client.send("Page.enable").catch(() => {});
      await client.send("Network.enable").catch(() => {});
      await client.send("Runtime.enable").catch(() => {});
      clients.push({ target, client });
    }
    return clients;
  };

  const iframeClients = await attachIframeClients();

  const beforeShot = await page.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(join(outDir, "before.png"), Buffer.from(beforeShot.data, "base64"));

  if (scenario.click) {
    await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: scenario.click.x, y: scenario.click.y, button: "none" }).catch(() => {});
    await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: scenario.click.x, y: scenario.click.y, button: "left", clickCount: 1 }).catch(() => {});
    await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: scenario.click.x, y: scenario.click.y, button: "left", clickCount: 1 }).catch(() => {});
    await delay(scenario.afterClickWaitMs ?? 8000);
  }

  const afterShot = await page.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(join(outDir, "after.png"), Buffer.from(afterShot.data, "base64"));

  const stateRaw = await safeEval(page, `JSON.stringify({
    url: location.href,
    title: document.title,
    text: document.body ? document.body.innerText.slice(0, 3500) : '',
    htmlLength: document.documentElement ? document.documentElement.outerHTML.length : 0,
    scripts: Array.from(document.scripts).map(s => s.src || ('INLINE:' + s.textContent.slice(0,160))).slice(0,120),
    iframes: Array.from(document.querySelectorAll('iframe')).map(f => ({src:f.src, sandbox:f.getAttribute('sandbox'), allow:f.getAttribute('allow'), width:f.width, height:f.height})),
    forms: Array.from(document.forms).map(f => ({action:f.action, method:f.method, inputs:Array.from(f.querySelectorAll('input,select,textarea')).map(i => ({type:i.type, name:i.name, id:i.id, placeholder:i.placeholder, autocomplete:i.autocomplete})).slice(0,80)})),
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({text:(a.innerText||a.textContent||'').trim().slice(0,100), href:a.href, target:a.target, rel:a.rel})).slice(0,150),
    localStorage: Object.fromEntries(Object.keys(localStorage).map(k => [k, String(localStorage.getItem(k)).slice(0,120)])),
    sessionStorageKeys: Object.keys(sessionStorage),
    notificationPermission: window.Notification ? Notification.permission : 'no-api',
    serviceWorkerController: !!navigator.serviceWorker?.controller
  })`);

  const cookies = await page.send("Network.getAllCookies").catch((e) => ({ error: String(e) }));
  const allTargets = await waitForJson("/json");
  const iframeEvents = iframeClients.map(({ target, client }) => ({
    target: { id: target.id, type: target.type, url: target.url, title: target.title },
    events: summarizeEvents(client.events),
  }));

  const result = {
    scenario: scenarioName,
    generatedAt: new Date().toISOString(),
    url: scenario.url,
    mobile: !!scenario.mobile,
    viewport: { width, height },
    chromeProfile: profileDir,
    downloadDir,
    state: typeof stateRaw === "string" ? JSON.parse(stateRaw) : stateRaw,
    cookies,
    targets: allTargets.map((t) => ({ id: t.id, type: t.type, url: t.url, title: t.title })),
    pageEvents: summarizeEvents(page.events),
    iframeEvents,
    browserEvents: browser.events,
  };

  await writeFile(join(outDir, "probe-result.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({
    scenario: scenarioName,
    out: outDir,
    finalUrl: result.state?.url,
    title: result.state?.title,
    domains: result.pageEvents.domains,
    iframeDomains: iframeEvents.map((entry) => entry.events.domains),
    popups: [
      ...result.pageEvents.popups,
      ...iframeEvents.flatMap((entry) => entry.events.popups),
    ],
    downloads: [
      ...result.pageEvents.downloads,
      ...iframeEvents.flatMap((entry) => entry.events.downloads),
    ],
    localStorageKeys: Object.keys(result.state?.localStorage ?? {}),
  }, null, 2));

  page.close();
  for (const { client } of iframeClients) client.close();
  browser.close();
} finally {
  chrome.kill("SIGTERM");
  await delay(500).catch(() => {});
  chrome.kill("SIGKILL");
  process.exit(0);
}
