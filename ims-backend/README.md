# IMS Backend

Spring Boot backend for Inventory Management System.

## Tech Stack
- Java 11
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Lombok
- DevTools

> **Note:** The backend is configured for Java 11 (see pom.xml). All code and instructions target Java 11 for compatibility.

## Structure
- Layered: Controller → Service → Repository
- Modular packages for maintainability

## Getting Started
1. Configure `src/main/resources/application.properties` with your PostgreSQL DB settings.
2. Run with `./mvnw spring-boot:run` (Linux/macOS) or `mvnw.cmd spring-boot:run` (Windows).

## Next Steps
- Implement domain models and business logic
- Add API documentation (Swagger)