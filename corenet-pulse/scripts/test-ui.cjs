"use strict";

// Run with Node.js and Playwright installed. All telemetry below is an isolated
// browser fixture: the test never calls or changes a deployed Hub or Agent.
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const staticRoot = path.resolve(__dirname, "../internal/hub/static");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    const file = path.resolve(staticRoot, relativePath || "index.html");
    if (!file.startsWith(`${staticRoot}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    const content = await fs.readFile(file);
    response.writeHead(200, {
      "content-type": contentTypes[path.extname(file)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(content);
  } catch {
    response.writeHead(404).end();
  }
});

function fixture() {
  const now = Math.floor(Date.now() / 1000);
  const node = (id, name, latency, online = true) => ({
    id,
    name,
    region: "Tokyo",
    country: "JP",
    provider: "TEST ONLY",
    network: "Test network",
    plan: "Local fixture",
    online,
    last_seen: now,
    system: {
      cpu_model: "Test CPU",
      cpu_cores: 2,
      mem_total: 2000,
      disk_total: 5000,
      os: "Linux",
      arch: "x86_64",
    },
    metrics: {
      cpu: 20,
      mem_used: 1000,
      disk_used: 3000,
      net_rx: 10240,
      net_tx: 5120,
      total_rx: 12345,
      total_tx: 56789,
      uptime: 3600,
      load: [0.1, 0.2, 0.3],
      tcp: 10,
      udp: 4,
      procs: 14,
    },
    history: [
      { net_rx: 3, net_tx: 2 },
      { net_rx: 6, net_tx: 4 },
    ],
    probes: latency === null ? [] : ["sh-ct", "sh-cu", "sh-cm", "ah-ct", "ah-cu", "ah-cm"].map(probeID => ({
      id: probeID,
      status: "ok",
      avg_ms: latency,
      min_ms: latency - 1,
      max_ms: latency + 1,
      loss_percent: 0,
      checked_at: now,
      window_sent: 30,
      window_received: 30,
    })),
  });
  return {
    generated_at: now,
    site: { name: "LOCAL TEST", subtitle: "PRIVATE INFRASTRUCTURE TELEMETRY" },
    nodes: [
      node("slow", "Beta slow", 93),
      node("missing", "Gamma unavailable", null),
      node("offline", "Offline node", 2, false),
      node("fast", "Alpha fast", 19),
    ],
  };
}

async function main() {
  let browser;
  const checks = [];
  const errors = [];
  const pass = name => {
    checks.push(name);
    console.log(`PASS ${name}`);
  };
  const observeErrors = page => page.on("pageerror", error => errors.push(error.message));

  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const origin = `http://127.0.0.1:${server.address().port}`;
    const launchOptions = { headless: true };
    if (process.env.PULSE_BROWSER_EXECUTABLE) {
      launchOptions.executablePath = process.env.PULSE_BROWSER_EXECUTABLE;
    }
    browser = await chromium.launch(launchOptions);
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page = await context.newPage();
    observeErrors(page);

    // Route every request so links or future assets cannot contact production.
    let fail = false;
    let malformed = false;
    await context.route("**/*", route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      if (url.pathname === "/api/public/state") {
        if (fail) return route.fulfill({ status: 503, body: "unavailable" });
        return route.fulfill({
          contentType: "application/json",
          body: JSON.stringify(malformed ? { generated_at: 1, nodes: [null] } : fixture()),
        });
      }
      if (url.pathname === "/api/public/events") {
        return route.fulfill({
          contentType: "text/event-stream",
          body: "event: ready\ndata: {}\n\n",
        });
      }
      return route.continue();
    });

    await page.goto(origin);
    await page.waitForSelector(".node-card");
    assert.equal(await page.locator("html").getAttribute("data-theme"), "mecha");
    pass("default mecha theme and dashboard data rendering");

    await page.selectOption("#sort", "sh-ct");
    assert.deepEqual(
      await page.locator("#node-grid > .node-card").evaluateAll(cards => cards.map(card => card.dataset.id)),
      ["fast", "slow", "missing", "offline"],
    );
    pass("carrier latency excludes unavailable/offline zero-ranking");

    await page.locator('.node-card[data-id="fast"] .favorite-button').click();
    await page.click("#favorites-only");
    assert.equal(await page.locator("#node-grid > .node-card").count(), 1);
    await page.reload();
    await page.waitForSelector("#node-grid > .node-card");
    assert.equal(await page.locator("#node-grid > .node-card").count(), 1);
    assert.equal(await page.locator("#favorites-only").getAttribute("aria-pressed"), "true");
    assert.equal(await page.locator("#sort").inputValue(), "sh-ct");
    pass("favorite filter, node selection, and sort persist across reload");

    await page.click("#clear-filters");
    assert.equal(await page.locator("#node-grid > .node-card").count(), 4);
    await page.click("#view-list");
    assert.equal(await page.locator(".node-row").count(), 4);
    await page.locator('.node-row[data-id="fast"] .details-button').click();
    assert.equal(await page.locator(".row-detail:not([hidden]) .aux-probes .probe-line").count(), 3);
    pass("table mode and Anhui auxiliary detail remain functional");

    await page.click("#display-toggle");
    await page.click('[data-language-choice="zh-Hans"]');
    assert.equal(await page.locator("html").getAttribute("lang"), "zh-Hans");
    assert.equal(await page.locator('#sort option[value="sh-ct"]').textContent(), "上海电信 · 延迟从低到高");
    await page.click('[data-theme-choice="coast"]');
    await page.click("#display-toggle");
    pass("language changes update new controls and legacy themes remain available");

    await page.click("#motion-toggle");
    assert.equal(await page.locator("body").getAttribute("data-motion"), "paused");
    const motionImages = page.locator("img[data-motion-still]");
    assert.ok(await motionImages.count() > 0);
    assert.ok(await motionImages.evaluateAll(images => images.every(image => image.getAttribute("src") === image.dataset.motionStill)));
    await page.reload();
    await page.waitForSelector(".node-row");
    assert.equal(await page.locator("body").getAttribute("data-motion"), "paused");
    assert.equal(await page.locator("html").getAttribute("data-theme"), "coast");
    pass("motion toggle replaces moving image sources and persists with theme");

    await page.focus("#search");
    await page.keyboard.press("Escape");
    assert.equal(await page.evaluate(() => document.activeElement.id), "search");
    pass("Escape does not steal focus when settings are closed");

    fail = true;
    await page.click("#refresh-now");
    await page.waitForSelector('body[data-stale="true"]');
    assert.equal(await page.locator("#fleet-rx").textContent(), "—");
    assert.equal(await page.locator('.node-row[data-id="fast"] .row-rx').textContent(), "—");
    assert.equal(await page.locator(".node-row").count(), 4);
    pass("fetch failure retains last state without showing stale live rates");

    fail = false;
    await page.click("#retry");
    await page.waitForSelector('body[data-stale="false"]');
    assert.notEqual(await page.locator("#fleet-rx").textContent(), "—");
    pass("manual retry restores live rates");

    malformed = true;
    await page.click("#refresh-now");
    await page.waitForSelector('body[data-stale="true"]');
    assert.equal(await page.locator(".node-row").count(), 4);
    malformed = false;
    await page.click("#retry");
    await page.waitForSelector('body[data-stale="false"]');
    pass("malformed snapshot cannot replace valid previous data");

    await context.setOffline(true);
    await page.waitForSelector('body[data-stale="true"]');
    assert.equal(await page.locator("#connection-state").textContent(), "网络已断开");
    await context.setOffline(false);
    await page.waitForSelector('body[data-stale="false"]');
    pass("offline/online reconnect recovers automatically");

    const reduced = await browser.newContext({ reducedMotion: "reduce" });
    const reducedPage = await reduced.newPage();
    observeErrors(reducedPage);
    await reduced.route("**/*", route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      if (url.pathname === "/api/public/state") {
        return route.fulfill({ contentType: "application/json", body: JSON.stringify(fixture()) });
      }
      if (url.pathname === "/api/public/events") return route.abort();
      return route.continue();
    });
    await reducedPage.goto(origin);
    await reducedPage.waitForSelector('body[data-motion="paused"]');
    assert.equal(await reducedPage.locator("#motion-toggle").getAttribute("aria-pressed"), "false");
    pass("OS reduced-motion defaults to paused animation");

    assert.deepEqual(errors, []);
    pass("no uncaught frontend exceptions");
    console.log(`\n${checks.length} frontend regression checks passed.`);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
