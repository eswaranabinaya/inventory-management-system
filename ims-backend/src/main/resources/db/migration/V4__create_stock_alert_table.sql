CREATE TABLE stock_alert (
    id BIGSERIAL PRIMARY KEY,
    inventory_id BIGINT NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    threshold INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    resolved_at TIMESTAMP
);