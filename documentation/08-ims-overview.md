# Inventory Management System (IMS) – Comprehensive Overview

## Table of Contents
1. Introduction
2. System Architecture
3. Backend Functionality
4. Frontend Functionality
5. Data Model & Database
6. API Endpoints
7. Extensibility & Enhancement Guidelines
8. DevOps & Deployment
9. Testing Strategy
10. Further Enhancements

---

## 1. Introduction
The IMS is a cloud-native, enterprise-grade inventory management platform built with Java (Spring Boot) for the backend and React.js (with Vite) for the frontend. It is designed for scalability, maintainability, and extensibility, following best practices in software engineering.

---

## 2. System Architecture
- **Backend:** Java 11, Spring Boot 2.7.18, layered architecture (Controller → Service → Repository), PostgreSQL, Flyway for migrations.
- **Frontend:** React.js 19.1.0 (functional components), Vite 7.0.4, Tailwind CSS 3.3.0, modular folder structure.
- **DevOps:** Dockerized, supports CI/CD, environment-based configuration.

### High-Level Architecture Diagram

```mermaid
flowchart TD
  A["User"] --> B["React Frontend (Vite)"]
  B -->|"REST API calls"| C["Spring Boot Backend"]
  C -->|"JDBC"| D["PostgreSQL DB"]
  C -->|"Flyway Migrations"| D
```

---

## 3. Backend Functionality
- **Product Management:** CRUD for products (name, SKU, category, price, description).
- **Warehouse Management:** CRUD for warehouses (name, location).
- **Inventory Management:** Track product quantities per warehouse with movement tracking.
- **Purchase Orders:**
  - Create purchase orders (supplier, product name, warehouse name, quantity, unit cost)
  - Fulfill purchase orders (updates inventory, marks as received)
- **Stock Alerts:** Automated stock level monitoring with threshold-based alerts.
- **User Authentication:** JWT-based authentication with registration and login.
- **Reporting Dashboard:** 
  - Inventory turnover reports
  - Stock valuation reports
  - Inventory trends analysis
- **Validation:** JSR-380 bean validation on DTOs.
- **Exception Handling:** Global handler for REST errors.
- **DTOs & Mappers:** Clean separation between entities and API contracts.
- **OpenAPI/Swagger:** Auto-generated API docs.

### Technical Details
- **Layered Architecture:**
  - Controller: Handles HTTP requests, returns DTOs.
  - Service: Business logic, transaction management.
  - Repository: JPA repositories for DB access.
- **Error Handling:**
  - All exceptions are caught by a global handler and returned as structured JSON errors.
  - Validation errors return 400 with field-level messages.
- **Security:**
  - ✅ **IMPLEMENTED** JWT-based authentication with Spring Security
  - Role-based access control (USER, ADMIN, MANAGER roles)
  - CORS configuration for frontend-backend communication
  - Input validation and output encoding to prevent injection attacks.
- **Database Migrations:**
  - All schema changes are managed via Flyway SQL scripts.
- **Extensibility:**
  - New modules follow the same pattern: Entity → Repository → Service → Controller → DTOs.

---

## 4. Frontend Functionality
- **Authentication:**
  - Login and registration pages
  - JWT token management
  - Protected routes with authentication guards
- **Product Module:**
  - List, create, edit products
  - Responsive forms with validation
- **Warehouse Module:**
  - List, create, edit warehouses
- **Inventory Module:**
  - List, create, edit inventory records
  - Movement tracking
- **Purchase Order Module:**
  - List all purchase orders
  - Create purchase order (select product/warehouse by name)
  - Fulfill purchase order (mark as received)
- **Stock Alerts Module:**
  - View and manage stock alerts
  - Threshold-based monitoring
- **Reporting Module:**
  - Dashboard with key metrics
  - Inventory turnover reports
  - Stock valuation reports
  - Inventory trends analysis
- **Routing:** React Router v7.7.1 for navigation with protected routes
- **Reusable Components:** For API calls, forms, and tables
- **Styling:** Tailwind CSS for consistent, responsive design

### Technical Details
- **API Integration:**
  - All API calls are made via dedicated service files using fetch/axios.
  - Error handling is centralized; user feedback is shown for all failed actions.
  - Vite proxy configuration for development (localhost:5173 → localhost:8080).
- **Form Validation:**
  - Uses controlled components and validation logic for required fields and types.
- **Navigation:**
  - React Router v7.7.1 for page navigation and route protection.
  - Authentication guards for protected routes.
- **Component Structure:**
  - Pages under `src/pages/`, reusable UI under `src/components/`.
- **State Management:**
  - Local state via hooks; can be extended to use Context or Redux for larger apps.

---

## 5. Data Model & Database
- **User:** id (UUID), username, password, role
- **Product:** id (UUID), name, SKU, category, price, description, timestamps
- **Warehouse:** id (UUID), name, location
- **Inventory:** id, product_id (FK), warehouse_id (FK), quantity, timestamps
- **PurchaseOrder:** id (UUID), supplier_name, product_name, warehouse_name, quantity, unit_cost, order_date, user_id, status, received_at, received_by
- **StockAlert:** id, inventory_id (FK), quantity, threshold, created_at, resolved, resolved_at
- **InventoryMovement:** id, product_id (FK), warehouse_id (FK), movement_type, quantity, unit_cost, movement_date, reference
- **Migrations:** Managed by Flyway, SQL scripts in `src/main/resources/db/migration`

---

## 6. API Endpoints
- RESTful endpoints under `/api/`
- **Authentication:**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration
- **Products:**
  - `GET /api/products`, `POST /api/products`, `PUT /api/products/{id}`, `DELETE /api/products/{id}`
- **Warehouses:**
  - `GET /api/warehouses`, `POST /api/warehouses`, `PUT /api/warehouses/{id}`, `DELETE /api/warehouses/{id}`
- **Inventory:**
  - `GET /api/inventory`, `POST /api/inventory`, `PUT /api/inventory/{id}`
- **Purchase Orders:**
  - `GET /api/purchase-orders`, `POST /api/purchase-orders`, `POST /api/purchase-orders/{id}/fulfill`
- **Stock Alerts:**
  - `GET /api/stock-alerts`, `POST /api/stock-alerts`, `DELETE /api/stock-alerts/{id}`
- **Reporting:**
  - `GET /api/reports/inventory-turnover` - Inventory turnover reports
  - `GET /api/reports/stock-valuation` - Stock valuation reports
  - `GET /api/reports/inventory-trends` - Inventory trends analysis
- See `03-api-endpoints.md` for full details

---

## 7. Extensibility & Enhancement Guidelines
- **Backend:**
  - Follow layered architecture and SOLID principles
  - Add new modules by creating new Entity, Repository, Service, Controller, and DTO classes
  - Use Flyway for DB changes (create new migration files)
  - Use global exception handling for new error types
- **Frontend:**
  - Add new pages/components under `src/pages/` and `src/components/`
  - Use hooks for API logic, keep UI modular
  - Follow existing folder and naming conventions
- **General:**
  - Keep business logic in services, not controllers
  - Use DTOs for all API input/output
  - Write unit and integration tests for new features

---

## 8. DevOps & Deployment
- **Docker:** Multi-stage builds for backend and frontend
- **.dockerignore:** Used to optimize Docker context
- **CI/CD:** (Recommended) Use GitHub Actions or similar for build/test/deploy
- **Environment Variables:** Use for DB credentials, API URLs, etc.

---

## 9. Testing Strategy
- **Backend:** JUnit + Mockito for services, MockMvc for controllers, validation tests for DTOs
- **Frontend:** Vitest + React Testing Library for components and hooks
- **Test Coverage:** Ensure all business logic and API endpoints are covered

---

## 10. Further Enhancements
- ✅ **COMPLETED** User authentication & authorization (JWT, roles)
- ✅ **COMPLETED** Stock alerts and monitoring
- ✅ **COMPLETED** Reporting dashboard and analytics
- ✅ **COMPLETED** Inventory movement tracking
- Pagination, filtering, and search for large datasets
- Audit logging and activity tracking
- Bulk import/export (CSV, Excel)
- Notification system (email/SMS on order events)
- API rate limiting and security hardening
- Cloud deployment (AWS, Azure, GCP)

---

**This document provides a single source of truth for the IMS project. For any enhancement, refer to this overview to understand the architecture, data flow, and best practices.**