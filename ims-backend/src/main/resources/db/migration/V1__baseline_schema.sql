-- Baseline schema for IMS with UUID keys

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    sku VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(255),
    price NUMERIC(19,2) NOT NULL CHECK (price >= 0),
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE warehouse (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE inventory (
    id BIGSERIAL PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    warehouse_id UUID NOT NULL REFERENCES warehouse(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (product_id, warehouse_id)
);