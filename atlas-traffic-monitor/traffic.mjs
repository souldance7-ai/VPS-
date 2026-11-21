import { DurableObject } from 'cloudflare:workers';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const dayMs = 86_400_000;
const onlineWindow = 300_000;
const touchInterval = 60_000;
const dayAt = now => new Date(now + 8 * 3_600_000).toISOString().slice(0, 10);
const reply = (value, status = 200) => Response.json(value, {
  status, headers: {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'}
});

async function readEvent(request) {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = '';
  let byteCount = 0;
  try {
    for (;;) {
      const {value, done} = await reader.read();
      if (done) break;
      byteCount += value.byteLength;
      if (byteCount > 256) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, {stream: true});
    }
    const event = JSON.parse(body + decoder.decode());
    if (typeof event?.visitor !== 'string' || !uuid.test(event.visitor)) return null;
    if (event.view != null && (typeof event.view !== 'string' || !uuid.test(event.view))) return null;
    return {visitor: event.visitor, view: event.view || null};
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const counter = env.TRAFFIC.get(env.TRAFFIC.idFromName('atlas'));
    if (request.method === 'GET' && url.pathname === '/api/traffic/stats') {
      return counter.snapshot();
    }
    if (request.method !== 'POST' || url.pathname !== '/api/traffic/event') {
      return reply({error: 'unknown route'}, 404);
    }
    if (request.headers.get('Origin') !== url.origin || !/^application\/json\b/i.test(request.headers.get('Content-Type') || '')) {
      return reply({error: 'invalid origin or content type'}, 403);
    }
    const event = await readEvent(request);
    if (!event) return reply({error: 'invalid event'}, 400);
    return counter.record(event);
  }
};

export class TrafficCounter extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS visitors (id TEXT PRIMARY KEY, seen INTEGER NOT NULL) WITHOUT ROWID;
      CREATE INDEX IF NOT EXISTS online_visitors ON visitors (seen);
      CREATE TABLE IF NOT EXISTS views (id TEXT PRIMARY KEY, seen INTEGER NOT NULL) WITHOUT ROWID;
      CREATE INDEX IF NOT EXISTS expired_views ON views (seen);
      CREATE TABLE IF NOT EXISTS totals (id INTEGER PRIMARY KEY CHECK (id = 1),
        started INTEGER NOT NULL, day TEXT NOT NULL, today INTEGER NOT NULL DEFAULT 0,
        views INTEGER NOT NULL DEFAULT 0, visitors INTEGER NOT NULL DEFAULT 0);
    `);
    const now = Date.now();
    this.sql.exec('INSERT OR IGNORE INTO totals (id, started, day) VALUES (1, ?, ?)', now, dayAt(now));
  }

  values(now) {
    const day = dayAt(now);
    const totals = this.sql.exec('SELECT started, day, today, views, visitors FROM totals WHERE id = 1').one();
    const {online} = this.sql.exec('SELECT COUNT(*) AS online FROM visitors WHERE seen > ?', now - onlineWindow).one();
    return {
      online, pageviews: totals.views, visitors: totals.visitors,
      todayPageviews: totals.day === day ? totals.today : 0, day, timezone: 'Asia/Taipei',
      countedSince: new Date(totals.started).toISOString(), checkedAt: new Date(now).toISOString()
    };
  }

  snapshot() {
    return reply(this.values(Date.now()));
  }

  async record({visitor, view}) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(visitor));
    const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    const now = Date.now();
    const day = dayAt(now);
    const result = this.ctx.storage.transactionSync(() => {
      const visits = this.sql.exec('INSERT OR IGNORE INTO visitors (id, seen) VALUES (?, ?) RETURNING id', key, now).toArray().length;
      if (!visits) this.sql.exec('UPDATE visitors SET seen = ? WHERE id = ? AND seen <= ?', now, key, now - touchInterval);
      const views = view ? this.sql.exec('INSERT OR IGNORE INTO views (id, seen) VALUES (?, ?) RETURNING id', view, now).toArray().length : 0;
      if (visits || views) this.sql.exec(`UPDATE totals SET visitors = visitors + ?, views = views + ?,
        today = CASE WHEN day = ? THEN today + ? ELSE ? END, day = ? WHERE id = 1`, visits, views, day, views, views, day);
      if (view) this.sql.exec('DELETE FROM views WHERE id IN (SELECT id FROM views WHERE seen < ? ORDER BY seen LIMIT 10)', now - 2 * dayMs);
      return this.values(now);
    });
    return reply(result);
  }
}
