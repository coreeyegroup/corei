CREATE TABLE IF NOT EXISTS capital_reservations (
    id BIGSERIAL PRIMARY KEY,
    reservation_id TEXT NOT NULL,
    partition_id TEXT NOT NULL,
    reserved_capital BIGINT NOT NULL,
    reservation_status TEXT NOT NULL,
    created_at BIGINT NOT NULL
);
