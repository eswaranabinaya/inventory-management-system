CREATE TABLE purchase_order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    warehouse_name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    order_date TIMESTAMP NOT NULL DEFAULT now(),
    user_id UUID,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    received_at TIMESTAMP,
    received_by VARCHAR(100)
);