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
