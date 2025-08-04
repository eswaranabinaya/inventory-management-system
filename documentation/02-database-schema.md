# Database Schema & ERD

## Tables

| Table                | Columns                                                                                 |
|----------------------|----------------------------------------------------------------------------------------|
| app_user             | id (UUID PK), username (VARCHAR(50) UNIQUE), password (VARCHAR(255)), role (VARCHAR(20)) |
| product              | id (UUID PK), name (VARCHAR(255) UNIQUE), sku (VARCHAR(255) UNIQUE), category (VARCHAR(255)), price (NUMERIC(19,2)), description (TEXT), created_at, updated_at |
| warehouse            | id (UUID PK), name (VARCHAR(100) UNIQUE), location (VARCHAR(255))                     |
| inventory            | id (BIGSERIAL PK), product_id (UUID FK), warehouse_id (UUID FK), quantity (INTEGER), created_at, updated_at |
| purchase_order       | id (UUID PK), supplier_name (VARCHAR(255)), product_name (VARCHAR(255)), warehouse_name (VARCHAR(100)), quantity (INTEGER), unit_cost (NUMERIC(19,2)), order_date (TIMESTAMP), user_id (UUID FK), status (VARCHAR(20)), received_at (TIMESTAMP), received_by (VARCHAR(100)) |
| stock_alert          | id (BIGSERIAL PK), inventory_id (BIGINT FK), quantity (INTEGER), threshold (INTEGER), created_at (TIMESTAMP), resolved (BOOLEAN), resolved_at (TIMESTAMP) |
| inventory_movement   | id (BIGSERIAL PK), product_id (UUID FK), warehouse_id (UUID FK), movement_type (VARCHAR(20)), quantity (INTEGER), unit_cost (NUMERIC(19,2)), movement_date (TIMESTAMP), reference (VARCHAR(255)) |

## Relationships

- **User** (1) — (M) **PurchaseOrder**
- **Product** (1) — (M) **Inventory**
- **Product** (1) — (M) **InventoryMovement**
- **Warehouse** (1) — (M) **Inventory**
- **Warehouse** (1) — (M) **InventoryMovement**
- **Inventory** (1) — (M) **StockAlert**
- **Inventory** (M) — (1) **Product**
- **Inventory** (M) — (1) **Warehouse**

## ERD (ASCII)

```
+-----------+        +-------------+        +-------------+
|  Product  |<------<|  Inventory  |>------>| Warehouse   |
+-----------+        +-------------+        +-------------+
     ^  ^                  ^                       ^  ^
     |  |                  |                       |  |
     |  +--------+         |                       |  +--------+
     |           |         |                       |           |
+-----------+    |    +-------------+        +-------------+    |
|StockAlert |    |    |PurchaseOrder|        |Inventory    |    |
+-----------+    |    +-------------+        |Movement     |    |
                 |         ^                +-------------+    |
                 |         |                       ^           |
                 v         v                       |           |
              +-------> User <---------------------+-----------+
```

## Key Features

### Constraints
- **Product**: name and SKU are unique, price must be >= 0
- **Warehouse**: name is unique
- **Inventory**: quantity must be >= 0, unique combination of product_id and warehouse_id
- **Purchase Order**: quantity must be > 0, unit_cost must be >= 0
- **Stock Alert**: quantity and threshold must be >= 0

### Audit Fields
- **Product**: created_at, updated_at (auto-managed by JPA auditing)
- **Inventory**: created_at, updated_at (auto-managed by JPA auditing)
- **Purchase Order**: order_date (defaults to current timestamp)
- **Stock Alert**: created_at (defaults to current timestamp)
- **Inventory Movement**: movement_date (defaults to current timestamp)

### Status Values
- **Purchase Order Status**: PENDING, RECEIVED, CANCELLED
- **Stock Alert Resolved**: TRUE/FALSE
- **Movement Types**: IN, OUT, TRANSFER, ADJUSTMENT