# Code Generation Prompts for IMS

## Prompt 1: Product CRUD API Endpoints

**Prompt**: "Generate a set of REST API endpoints in Spring Boot for managing products, including create, read, update, and delete operations. Use DTOs for request and response, and validate input."

**Context**: Needed a robust product management API with input validation, unique constraints, and clear separation of concerns using DTOs and service layers.

**Output Quality**: 8

**Modifications**: 2

**Final Result**: Implemented `ProductController` with endpoints for create (`POST /api/products`), read (all and by ID), update, and delete. Used `ProductRequestDTO` and `ProductResponseDTO`, added validation annotations, and enforced unique SKU constraints. Minor adjustments to error handling and response status codes.

---

## Prompt 2: Inventory Management Endpoints

**Prompt**: "Create REST API endpoints in Spring Boot for managing inventory records, supporting CRUD operations and linking products and warehouses. Ensure quantity is non-negative and support composite uniqueness."

**Context**: Required endpoints to manage inventory per product and warehouse, with validation for quantity and uniqueness of (product, warehouse) pairs.

**Output Quality**: 7

**Modifications**: 3

**Final Result**: Developed `InventoryController` with endpoints for create, read, update, and delete. Used DTOs for input/output, validated non-negative quantity, and enforced composite uniqueness. Refined error messages and added audit fields after review.

---

## Prompt 3: Purchase Order and Fulfillment API

**Prompt**: "Implement REST API endpoints in Spring Boot for creating, retrieving, and fulfilling purchase orders. Include support for supplier info, status updates, and user tracking."

**Context**: Needed to manage purchase order lifecycle, including creation, retrieval, and fulfillment, with support for supplier and user associations.

**Output Quality**: 6

**Modifications**: 4

**Final Result**: Built `PurchaseOrderController` with endpoints for creating (`POST /api/purchase-orders`), retrieving (by ID and all), and fulfilling orders. Used DTOs for requests and responses, added status and user fields, and refined fulfillment logic after multiple iterations.

---

## Prompt 4: Stock Alert Resolution Endpoint

**Prompt**: "Add an endpoint to resolve stock alerts in a Spring Boot inventory system. The endpoint should mark an alert as resolved and record the resolution timestamp."

**Context**: Needed a way to programmatically resolve low-stock alerts and update their status for reporting and notification purposes.

**Output Quality**: 7

**Modifications**: 2

**Final Result**: Added `POST /api/stock-alerts/{id}/resolve` endpoint in `StockAlertController` to mark alerts as resolved and set the resolved timestamp. Adjusted service logic to handle idempotency and improved response structure after review.

---

## Prompt 5: React Purchase Order Create Page

**Prompt**: "Generate a React component for creating a new purchase order. The form should include supplier name, product, warehouse, and quantity, and fetch product/warehouse options from APIs. On submit, call the backend and navigate to the list page."

**Context**: Needed a user-friendly form for purchase order creation, with dynamic dropdowns and error handling, integrated with backend APIs.

**Output Quality**: 8

**Modifications**: 2

**Final Result**: Built `PurchaseOrderCreatePage` using React hooks for state and effects, fetched product/warehouse lists on mount, and handled form submission with async/await. Added navigation and error alerts. Refined form validation and improved loading state after review.

---

## Prompt 6: React Inventory List Page

**Prompt**: "Create a React component to display a list of inventory records, including product and warehouse details. Support deletion with confirmation and refresh the list after changes."

**Context**: Required a responsive inventory list with product/warehouse lookups, delete functionality, and user feedback for loading/errors.

**Output Quality**: 7

**Modifications**: 3

**Final Result**: Developed `InventoryListPage` with useEffect for data loading, integrated delete with confirmation, and handled loading/error states. Improved UI alignment and added batch fetching for related entities after feedback.

---

## Prompt 7: Product Service Layer Logic

**Prompt**: "Implement a Spring Boot service class for product management, including create, read, update, and delete methods. Enforce unique constraints and use DTO mapping."

**Context**: Needed a robust service layer to encapsulate business logic, handle validation, and map between entities and DTOs.

**Output Quality**: 8

**Modifications**: 2

**Final Result**: Created `ProductServiceImpl` with methods for CRUD operations, unique checks for name and SKU, and mapping via `ProductMapper`. Improved exception handling and transactional boundaries after review.

---

## Prompt 8: Purchase Order Fulfillment Service Logic

**Prompt**: "Write a Spring Boot service method to fulfill a purchase order: update inventory, log movement, and set order status. Handle edge cases and ensure transactional integrity."

**Context**: Required to automate inventory updates and movement logging when a purchase order is fulfilled, with error handling for already-fulfilled orders.

**Output Quality**: 7

**Modifications**: 3

**Final Result**: Implemented fulfillment logic in `PurchaseOrderServiceImpl`, updating inventory, logging inbound movement, and setting order status. Added checks for duplicate fulfillment and improved error messages after multiple iterations.

---

## Prompt 9: Authentication Controller and JWT Logic

**Prompt**: "Implement a Spring Boot authentication controller with endpoints for user registration and login, using JWT for stateless authentication. Secure endpoints and handle token generation/validation."

**Context**: Needed secure user registration and login, JWT-based stateless authentication, and integration with Spring Security for endpoint protection.

**Output Quality**: 7

**Modifications**: 3

**Final Result**: Built `AuthController` with `/api/auth/register` and `/api/auth/login` endpoints, integrated JWT generation/validation, and configured security filters. Refined error handling and CORS settings after review.

---

## Prompt 10: Reporting API Endpoints

**Prompt**: "Create REST API endpoints in Spring Boot for inventory reporting, including inventory trends, turnover, and stock valuation. Return aggregated data for dashboard visualization."

**Context**: Required endpoints to provide summarized and trend data for reporting dashboards, with efficient queries and DTOs for frontend consumption.

**Output Quality**: 6

**Modifications**: 4

**Final Result**: Developed `ReportingController` with endpoints for inventory trends, turnover, and valuation. Used DTOs for responses, optimized queries, and adjusted endpoint structure for frontend integration after several iterations.

---

## Prompt 11: React Login Page

**Prompt**: "Generate a React login page with a form for username and password, calling the backend authentication API and storing the JWT token on success. Show error messages on failure."

**Context**: Needed a simple, user-friendly login page that integrates with backend authentication, manages JWT tokens, and provides feedback on errors.

**Output Quality**: 8

**Modifications**: 2

**Final Result**: Built `LoginPage` with controlled form, async API call to `/api/auth/login`, and localStorage token management. Added error display and improved form validation after review.

---

## Prompt 12: React Reporting Dashboard

**Prompt**: "Create a React dashboard page to display inventory trends, turnover, and stock valuation using data from reporting API endpoints. Use charts and summary cards for visualization."

**Context**: Required a visually appealing dashboard to present key inventory metrics, integrating with backend reporting APIs and using chart libraries for visualization.

**Output Quality**: 7

**Modifications**: 3

**Final Result**: Developed `ReportingDashboard` page, fetched data from reporting endpoints, and rendered charts and summary cards. Improved loading/error handling and chart configuration after feedback.