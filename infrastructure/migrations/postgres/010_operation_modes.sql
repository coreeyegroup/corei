CREATE TABLE operation_modes (
    mode_id TEXT PRIMARY KEY,
    mode_name TEXT NOT NULL,
    enabled BOOLEAN NOT NULL,
    updated_at BIGINT NOT NULL
);
