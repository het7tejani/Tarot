-- New isolated production database only. Never apply over an existing Test database.
PRAGMA foreign_keys=ON;
CREATE TABLE orders (
 id TEXT PRIMARY KEY,
 client_request_id TEXT NOT NULL UNIQUE,
 product_slug TEXT NOT NULL,
 product_title TEXT NOT NULL,
 amount_minor INTEGER NOT NULL CHECK(amount_minor>0),
 currency TEXT NOT NULL CHECK(currency='INR'),
 customer_name TEXT NOT NULL,
 customer_email TEXT NOT NULL,
 customer_question TEXT NOT NULL,
 payment_status TEXT NOT NULL DEFAULT 'pending' CHECK(payment_status IN('pending','paid','refunded','partially_refunded','disputed')),
 fulfilment_status TEXT NOT NULL DEFAULT 'new' CHECK(fulfilment_status IN('new','in_progress','ready','completed','delivery_issue','cancelled')),
 gateway_order_id TEXT UNIQUE,
 paid_payment_id TEXT UNIQUE,
 terms_version TEXT NOT NULL,
 created_at INTEGER NOT NULL,
 paid_at INTEGER,
 due_at INTEGER,
 updated_at INTEGER NOT NULL
);
CREATE TABLE gateway_events (
 event_id TEXT PRIMARY KEY,
 event_type TEXT NOT NULL,
 gateway_order_id TEXT,
 payment_id TEXT,
 received_at INTEGER NOT NULL,
 processed_at INTEGER,
 state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN('pending','processed','exception')),
 reason TEXT
);
CREATE TABLE payment_exceptions (
 payment_id TEXT PRIMARY KEY,
 order_id TEXT NOT NULL REFERENCES orders(id),
 reason TEXT NOT NULL,
 created_at INTEGER NOT NULL
);
CREATE TABLE order_files (
 id TEXT PRIMARY KEY,
 order_id TEXT NOT NULL REFERENCES orders(id),
 object_key TEXT NOT NULL UNIQUE,
 sha256 TEXT NOT NULL,
 bytes INTEGER NOT NULL CHECK(bytes>0),
 state TEXT NOT NULL DEFAULT 'draft' CHECK(state IN('draft','published','retired')),
 created_at INTEGER NOT NULL,
 published_at INTEGER
);
CREATE TABLE notification_outbox (
 id TEXT PRIMARY KEY,
 order_id TEXT NOT NULL REFERENCES orders(id),
 kind TEXT NOT NULL,
 version TEXT NOT NULL,
 state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN('pending','sending','accepted','failed')),
 attempts INTEGER NOT NULL DEFAULT 0,
 next_attempt_at INTEGER NOT NULL,
 lease_until INTEGER,
 provider_id TEXT,
 UNIQUE(order_id,kind,version)
);
CREATE TABLE access_tokens (
 token_hash TEXT PRIMARY KEY,
 order_id TEXT NOT NULL REFERENCES orders(id),
 expires_at INTEGER NOT NULL,
 consumed_at INTEGER
);
CREATE TABLE admin_audit (
 id TEXT PRIMARY KEY,
 actor_id TEXT NOT NULL,
 order_id TEXT REFERENCES orders(id),
 action TEXT NOT NULL,
 created_at INTEGER NOT NULL
);
CREATE INDEX orders_work_queue ON orders(payment_status,fulfilment_status,due_at);
CREATE INDEX events_pending ON gateway_events(state,received_at);
CREATE INDEX outbox_pending ON notification_outbox(state,next_attempt_at);

-- 0002_private_pdf_chunks.sql
-- Free-only private PDF storage for the isolated preview. No R2 billing activation.
CREATE TABLE pdf_chunks (
 file_id TEXT NOT NULL REFERENCES order_files(id) ON DELETE CASCADE,
 ordinal INTEGER NOT NULL CHECK(ordinal>=0),
 data BLOB NOT NULL,
 PRIMARY KEY(file_id,ordinal)
);

-- 0003_test_controls.sql
-- Isolated test environment only. Fixed-window abuse controls, no raw IP stored.
CREATE TABLE request_limits (
 key_hash TEXT PRIMARY KEY,
 window_start INTEGER NOT NULL,
 hits INTEGER NOT NULL CHECK(hits>0),
 expires_at INTEGER NOT NULL
);
CREATE INDEX request_limits_expiry ON request_limits(expires_at);
CREATE UNIQUE INDEX one_published_pdf_per_order ON order_files(order_id) WHERE state='published';

-- 0004_recovery.sql
CREATE TABLE recovery_tokens (
 token_hash TEXT PRIMARY KEY,
 order_id TEXT NOT NULL REFERENCES orders(id),
 expires_at INTEGER NOT NULL,
 consumed_at INTEGER
);
CREATE INDEX recovery_expiry ON recovery_tokens(expires_at);
CREATE TABLE recovery_claims (
 id TEXT PRIMARY KEY,
 order_id TEXT NOT NULL REFERENCES orders(id),
 created_at INTEGER NOT NULL
);

-- 0005_customer_dob.sql
-- Optional field already offered by the reading inquiry form. Never required for checkout.
ALTER TABLE orders ADD COLUMN customer_dob TEXT;
