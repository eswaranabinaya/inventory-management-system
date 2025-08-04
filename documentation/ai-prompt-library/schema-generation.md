# Schema Generation Prompts for IMS

## Prompt 1: Inventory, Product, and Warehouse Schema

**Prompt**: "Design a PostgreSQL schema for an inventory management system that supports products, warehouses, and inventory tracking. Each product can be stored in multiple warehouses, and inventory quantities must be tracked per warehouse. Use UUIDs for primary keys and ensure uniqueness for product SKUs and warehouse names."

**Context**: Needed a normalized schema to support multi-warehouse inventory, enforce unique product SKUs, and allow for future extensibility (e.g., audit fields).

**Output Quality**: 8

**Iterations**: 2

**Final Result**: Implemented tables for `product`, `warehouse`, and `inventory` with UUID primary keys, unique constraints on product SKU and warehouse name, and a composite unique constraint on (product_id, warehouse_id) in inventory. Added audit fields and used foreign keys for referential integrity.

---

## Prompt 2: Stock Alert Table for Low Inventory

**Prompt**: "Extend the inventory schema to support stock alerts. Create a table that records when inventory for a product in a warehouse falls below a threshold, including fields for alert status and resolution timestamp."

**Context**: The system required automated tracking of low-stock situations, with the ability to resolve and timestamp alerts for reporting and notification purposes.

**Output Quality**: 7

**Iterations**: 3

**Final Result**: Added a `stock_alert` table referencing `inventory`, with fields for quantity, threshold, created_at, resolved (boolean), and resolved_at. Adjusted the schema to support cascading deletes and added default values for status fields.

---

## Prompt 3: Inventory Movement and Purchase Order Schema

**Prompt**: "Design tables to track inventory movements (inbound/outbound) and purchase orders in a PostgreSQL-based inventory system. Movements should reference products and warehouses, and purchase orders should support supplier info, status, and user tracking."

**Context**: Needed to support audit trails for inventory changes and manage purchase order lifecycles, including supplier and user associations.

**Output Quality**: 6

**Iterations**: 4

**Final Result**: Created `inventory_movement` table with references to product and warehouse, movement type, quantity, unit cost, and reference fields. Purchase order table included supplier, product, warehouse, quantity, status, and user fields. Refined the schema to add unit cost to purchase orders and ensure all foreign keys and constraints matched business logic.