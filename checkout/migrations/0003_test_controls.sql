-- Isolated test environment only. Fixed-window abuse controls, no raw IP stored.
CREATE TABLE request_limits (
 key_hash TEXT PRIMARY KEY,
 window_start INTEGER NOT NULL,
 hits INTEGER NOT NULL CHECK(hits>0),
 expires_at INTEGER NOT NULL
);
CREATE INDEX request_limits_expiry ON request_limits(expires_at);
CREATE UNIQUE INDEX one_published_pdf_per_order ON order_files(order_id) WHERE state='published';
