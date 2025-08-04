# Product Module Documentation

## Overview
The Product module provides full CRUD (Create, Read, Update, Delete) functionality for products in the Inventory Management System. It is implemented with a Java Spring Boot backend and a React + Vite + Tailwind CSS frontend.

---

## Backend

### Entity: `Product`
- `UUID id` (Primary key, auto-generated)
- `String name` (required, unique)
- `String sku` (required, unique)
- `String category`
- `BigDecimal price` (non-negative)
- `String description` (optional)
- `LocalDateTime createdAt`, `updatedAt` (auto-managed by JPA auditing)

#### JPA Auditing
- `@CreatedDate` and `@LastModifiedDate` auto-populate `createdAt` and `updatedAt`.
- `@EnableJpaAuditing` is enabled in the main application class.

### Validation
- `name`: not blank, max 255 chars, unique
- `sku`: not blank, max 255 chars, unique
- `price`: not null, positive or zero

### Repository
- `ProductRepository extends JpaRepository<Product, UUID>`

### Service
- `ProductService` and `ProductServiceImpl` handle business logic and mapping.

### Controller
- `@RestController` at `/api/products`
- Endpoints:
  - `POST   /api/products`   – Create product
  - `GET    /api/products`   – List all products
  - `GET    /api/products/{id}` – Get product by ID
  - `PUT    /api/products/{id}` – Update product
  - `DELETE /api/products/{id}` – Delete product
- Uses DTOs for request/response and validation.

### Exception Handling
- Global exception handler for validation, not found, and data integrity errors.

### Database Migration
- Flyway migration: `V1__create_product_table.sql` creates the `product` table with all constraints.

---

## Frontend

### Tech Stack
- React (Vite)
- Tailwind CSS
- React Router DOM

### Folder Structure
- `src/pages/products/` – List, Create, Edit pages
- `src/components/products/` – Reusable ProductForm
- `src/services/productService.js` – API calls

### Features
- **Product List:** Table view, edit/delete actions, add new product
- **Product Create/Edit:** Form with validation, uses ProductForm
- **API Integration:** Uses fetch with `/api/products` endpoints
- **Proxy:** Vite proxy forwards `/api` requests to backend (`http://localhost:8080`)

### Validation
- Client-side validation matches backend (required fields, price ≥ 0)

---

## API Example

### Create Product (POST /api/products)
**Request Body:**
```json
{
  "name": "toy",
  "sku": "12345",
  "category": "toy",
  "price": 99,
  "description": "toy"
}
```
**Response:**
```json
{
  "id": "...uuid...",
  "name": "toy",
  "sku": "12345",
  "category": "toy",
  "price": 99,
  "description": "toy",
  "createdAt": "2025-07-31T13:30:00",
  "updatedAt": "2025-07-31T13:30:00"
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
3. **Open browser:**
   - Go to `http://localhost:5173/products`
4. **Test CRUD:**
   - Add, edit, delete products via UI
   - Confirm changes reflected in backend (and database)
5. **API Test:**
   - Use Postman or curl to test `/api/products` endpoints

---

## Troubleshooting
- **400 Bad Request:** Check required fields and validation rules
- **404 Not Found:** Ensure backend is running and endpoint is correct
- **CORS errors:** Confirm Vite proxy is set up in `vite.config.js`
- **Database errors:** Ensure Flyway migration ran and DB is up

---

## Summary
- Product module is fully functional and integrated
- Backend: Java 11, Spring Boot 2.7.x, PostgreSQL, Flyway, JPA auditing
- Frontend: React, Vite, Tailwind CSS, React Router, API proxy
- End-to-end tested and ready for further integration