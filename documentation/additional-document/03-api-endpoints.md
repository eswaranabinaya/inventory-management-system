# API Endpoints Documentation

## Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Product Catalog
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Warehouse Management
- `GET /api/warehouses` - List all warehouses
- `POST /api/warehouses` - Create new warehouse
- `PUT /api/warehouses/{id}` - Update warehouse
- `DELETE /api/warehouses/{id}` - Delete warehouse

## Inventory Tracking
- `GET /api/inventory` - List all inventory records
- `GET /api/inventory/{id}` - Get inventory by ID
- `POST /api/inventory` - Create new inventory record
- `PUT /api/inventory/{id}` - Update inventory record

## Purchase Orders
- `GET /api/purchase-orders` - List all purchase orders
- `POST /api/purchase-orders` - Create new purchase order
- `GET /api/purchase-orders/{id}` - Get purchase order by ID
- `PUT /api/purchase-orders/{id}` - Update purchase order
- `DELETE /api/purchase-orders/{id}` - Delete purchase order
- `POST /api/purchase-orders/{id}/fulfill` - Fulfill purchase order

## Stock Alerts
- `GET /api/stock-alerts` - List all stock alerts
- `POST /api/stock-alerts` - Create new stock alert
- `DELETE /api/stock-alerts/{id}` - Delete stock alert

## Reporting Dashboard
- `GET /api/reports/inventory-turnover` - Get inventory turnover report
  - Query params: `productId` (optional), `warehouseId` (optional), `startDate` (required), `endDate` (required)
- `GET /api/reports/stock-valuation` - Get stock valuation report
  - Query params: `productId` (optional), `warehouseId` (optional)
- `GET /api/reports/inventory-trends` - Get inventory trends report
  - Query params: `productId` (optional), `warehouseId` (optional), `startDate` (required), `endDate` (required)

## Request/Response Examples

### Authentication

**Login Request:**
```json
POST /api/auth/login
{
  "username": "testuser",
  "password": "testpass"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "testuser",
  "role": "USER"
}
```

### Product

**Create Product Request:**
```json
POST /api/products
{
  "name": "Sample Product",
  "sku": "PROD-001",
  "category": "Electronics",
  "price": 99.99,
  "description": "Sample product description"
}
```

**Product Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Sample Product",
  "sku": "PROD-001",
  "category": "Electronics",
  "price": 99.99,
  "description": "Sample product description",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### Purchase Order

**Create Purchase Order Request:**
```json
POST /api/purchase-orders
{
  "supplierName": "ABC Suppliers",
  "productName": "Sample Product",
  "warehouseName": "Main Warehouse",
  "quantity": 100,
  "unitCost": 85.50
}
```

**Fulfill Purchase Order:**
```json
POST /api/purchase-orders/{id}/fulfill
{
  "receivedBy": "John Doe"
}
```

## Notes
- All endpoints return DTOs, not entities
- Authentication endpoints are publicly accessible
- All other endpoints require JWT authentication
- Reporting endpoints require ADMIN or MANAGER role
- Date parameters use ISO format (YYYY-MM-DD)
- UUIDs are used for entity IDs
- Error responses follow standard HTTP status codes with JSON error messages