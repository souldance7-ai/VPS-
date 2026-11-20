CREATE TABLE IF NOT EXISTS stock_latest (
 probe TEXT PRIMARY KEY,
 checked_at INTEGER NOT NULL,
 current_state TEXT NOT NULL,
 confirmed_state TEXT,
 confirmed_at INTEGER,
 changed_at INTEGER
);
CREATE TABLE IF NOT EXISTS stock_changes (
 probe TEXT NOT NULL,
 at INTEGER NOT NULL,
 from_state TEXT NOT NULL,
 to_state TEXT NOT NULL,
 PRIMARY KEY (probe, at)
);
CREATE INDEX IF NOT EXISTS stock_changes_by_time ON stock_changes(at);

CREATE TABLE IF NOT EXISTS offer_latest (
 probe TEXT PRIMARY KEY,
 observed_at INTEGER NOT NULL,
 payload TEXT NOT NULL
);
