# Backend Architecture: Inventory Management System

## Layered Structure

- **Controller**: Handles HTTP requests, maps endpoints, returns DTOs.
- **Service**: Business logic, transaction management, orchestration.
- **Repository**: Data access, JPA interfaces, custom queries.

## Package Structure

```
com.inventory
│
├── config         # CORS, Swagger, security, etc.
├── controller     # REST controllers
├── dto            # Data Transfer Objects
├── exception      # Custom exceptions, handlers
├── model          # JPA entities
├── repository     # Spring Data JPA interfaces
├── service        # Business logic
├── util           # Utility classes, mappers
└── security       # (Optional) JWT, user auth
```

## Key Integrations

- **Spring Data JPA**: ORM for PostgreSQL.
- **Flyway/Liquibase**: Database migrations.
- **Swagger/OpenAPI**: API documentation.
- **CORS Config**: For frontend-backend communication.
- **Lombok**: Reduces boilerplate.
- **Spring DevTools**: Hot reload for dev.
- **JSR-380 Validation**: Input validation.
- **Exception Handling**: Global error handling.

## Principles

- Follows SOLID, clean code, and 12-Factor App methodology.
- Modular, testable, and scalable.