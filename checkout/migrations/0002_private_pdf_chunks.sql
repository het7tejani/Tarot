-- Free-only private PDF storage for the isolated preview. No R2 billing activation.
CREATE TABLE pdf_chunks (
 file_id TEXT NOT NULL REFERENCES order_files(id) ON DELETE CASCADE,
 ordinal INTEGER NOT NULL CHECK(ordinal>=0),
 data BLOB NOT NULL,
 PRIMARY KEY(file_id,ordinal)
);
