# Database Schema & ERD

## Tables

| Table           | Columns                                                                                 |
|-----------------|----------------------------------------------------------------------------------------|
| user            | id (PK), username, password_hash, email, role, created_at                              |
| product         | id (PK), name, sku, category, price, description, created_at                           |
| warehouse       | id (PK), name, location, created_at                                                    |
| inventory       | id (PK), product_id (FK), warehouse_id (FK), quantity, updated_at                      |
| purchase_order  | id (PK), supplier_name, product_id (FK), quantity, order_date, user_id (FK)            |
| stock_alert     | id (PK), product_id (FK), threshold, current_quantity, alert_date                      |

## Relationships

- **User** (1) — (M) **PurchaseOrder**
- **Product** (1) — (M) **Inventory**
- **Product** (1) — (M) **PurchaseOrder**
- **Product** (1) — (M) **StockAlert**
- **Warehouse** (1) — (M) **Inventory**
- **Inventory** (M) — (1) **Product**
- **Inventory** (M) — (1) **Warehouse**

## ERD (ASCII)

```
+-----------+        +-------------+        +-------------+
|  Product  |<------<|  Inventory  |>------>| Warehouse   |
+-----------+        +-------------+        +-------------+
     ^  ^                  ^
     |  |                  |
     |  +--------+         |
     |           |         |
+-----------+    |    +-------------+
|StockAlert |    |    |PurchaseOrder|
+-----------+    |    +-------------+
                 |         ^
                 |         |
                 v         v
              +-------> User
```