-- Create inventory_movement table
CREATE TABLE inventory_movement (
    id BIGSERIAL PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES product(id),
    warehouse_id UUID NOT NULL REFERENCES warehouse(id),
    movement_type VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_cost NUMERIC(19,2),
    movement_date TIMESTAMP NOT NULL DEFAULT NOW(),
    reference VARCHAR(255)
);

-- Add unit_cost to purchase_order
ALTER TABLE purchase_order ADD COLUMN unit_cost NUMERIC(19,2) NOT NULL DEFAULT 0.00;