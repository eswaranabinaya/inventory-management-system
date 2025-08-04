# Product Module Documentation

## Overview
The Product module provides full CRUD (Create, Read, Update, Delete) functionality for products in the Inventory Management System. It is implemented with a Java Spring Boot backend and a React + Vite + Tailwind CSS frontend.

---

## Backend

### Entity: `Product`
- `UUID id` (Primary key, auto-generated)
- `String name` (required, unique, max 255 chars)
- `String sku` (required, unique, max 255 chars)
- `String category` (optional, max 255 chars)
- `BigDecimal price` (non-negative, NUMERIC(19,2))
- `String description` (optional, TEXT)
- `LocalDateTime createdAt`, `updatedAt` (auto-managed by JPA auditing)

#### JPA Auditing
- `@CreatedDate` and `@LastModifiedDate` auto-populate `createdAt` and `updatedAt`.
- `@EnableJpaAuditing` is enabled in the main application class.

### Validation
- `name`: not blank, max 255 chars, unique
- `sku`: not blank, max 255 chars, unique
- `price`: not null, positive or zero
- Database constraints: CHECK (price >= 0)

### Repository
- `ProductRepository extends JpaRepository<Product, UUID>`

### Service
- `ProductService` and `ProductServiceImpl` handle business logic and mapping.

### Controller
- `@RestController` at `/api/products`
- **Authentication Required**: All endpoints require JWT authentication
- Endpoints:
  - `POST   /api/products`   – Create product
  - `GET    /api/products`   – List all products
  - `GET    /api/products/{id}` – Get product by ID
  - `PUT    /api/products/{id}` – Update product
  - `DELETE /api/products/{id}` – Delete product
- Uses DTOs for request/response and validation.

### Exception Handling
- Global exception handler for validation, not found, and data integrity errors.
- Returns structured JSON error responses.

### Database Migration
- Flyway migration: `V1__create_product_table.sql` creates the `product` table with all constraints.

---

## Frontend

### Tech Stack
- React 19.1.0 (Vite 7.0.4)
- Tailwind CSS 3.3.0
- React Router DOM 7.7.1

### Folder Structure
- `src/pages/products/` – List, Create, Edit pages
- `src/components/products/` – Reusable ProductForm
- `src/services/productService.js` – API calls

### Features
- **Product List:** Table view, edit/delete actions, add new product
- **Product Create/Edit:** Form with validation, uses ProductForm
- **API Integration:** Uses fetch with `/api/products` endpoints
- **Authentication:** Protected routes require JWT token
- **Proxy:** Vite proxy forwards `/api` requests to backend (`http://localhost:8080`)

### Validation
- Client-side validation matches backend (required fields, price ≥ 0)
- Real-time form validation with user feedback

---

## API Example

### Create Product (POST /api/products)
**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Sample Product",
  "sku": "PROD-001",
  "category": "Electronics",
  "price": 99.99,
  "description": "Sample product description"
}
```

**Response:**
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

### Error Response Example
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": {
    "name": "Product name is required",
    "sku": "SKU must be unique"
  }
}
```

---

## Testing Steps
1. **Start backend:**
   - `cd ims-backend`
   - `mvn spring-boot:run`
2. **Start frontend:**
   - `cd ims-frontend`
   - `npm run dev`
3. **Authentication:**
   - Register a new user at `http://localhost:5173/register`
   - Login at `http://localhost:5173/login`
4. **Open browser:**
   - Go to `http://localhost:5173/products`
5. **Test CRUD:**
   - Add, edit, delete products via UI
   - Confirm changes reflected in backend (and database)
6. **API Test:**
   - Use Postman or curl to test `/api/products` endpoints
   - Include JWT token in Authorization header

---

## Security Considerations
- **Authentication**: All product endpoints require valid JWT token
- **Authorization**: Currently all authenticated users can access products
- **Input Validation**: Both client and server-side validation
- **SQL Injection**: Protected by JPA/Hibernate
- **XSS**: Input sanitization and output encoding

---

## Troubleshooting
- **401 Unauthorized:** Ensure JWT token is valid and included in Authorization header
- **400 Bad Request:** Check required fields and validation rules
- **404 Not Found:** Ensure backend is running and endpoint is correct
- **CORS errors:** Confirm Vite proxy is set up in `vite.config.js`
- **Database errors:** Ensure Flyway migration ran and DB is up

---

## Summary
- Product module is fully functional and integrated
- Backend: Java 11, Spring Boot 2.7.18, PostgreSQL, Flyway, JPA auditing
- Frontend: React 19.1.0, Vite 7.0.4, Tailwind CSS 3.3.0, React Router 7.7.1
- Authentication: JWT-based with protected routes
- End-to-end tested and ready for production use