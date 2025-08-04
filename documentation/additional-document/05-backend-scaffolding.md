# Backend Scaffolding Setup

## Project Initialization
- Spring Boot (Maven)
- Group: com.inventory
- Artifact: ims-backend
- Java Version: 11 (configured in pom.xml)
- Dependencies: Spring Web, Spring Data JPA, PostgreSQL, Lombok, DevTools

> **Note:** The backend is configured for Java 11. All code and instructions target Java 11 for compatibility.

## Folder Structure
```
com.inventory
│
├── config
├── controller
├── dto
├── exception
├── model
├── repository
├── service
├── util
```

## Configuration
- `src/main/resources/application.properties` for DB and app settings
- Ready for Flyway/Liquibase, Swagger, and security integration

## Next Steps
- Implement entities, repositories, services, and controllers as per design
- Add DB migration and Swagger config