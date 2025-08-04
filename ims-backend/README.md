# IMS Backend

Spring Boot backend for the Inventory Management System (IMS) with comprehensive features and enterprise-grade architecture.

## 🚀 Quick Start

### Prerequisites
- **Java 11** (Required - see pom.xml for version)
- **Maven 3.6+**
- **PostgreSQL 12+**
- **Git**

### Quick Setup
```bash
# 1. Clone and navigate to backend
cd ims-backend

# 2. Configure database (see Configuration section)
# Update src/main/resources/application.properties

# 3. Run the application
./mvnw spring-boot:run          # Linux/macOS
mvnw.cmd spring-boot:run        # Windows

# 4. Access the application
# API: http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

## 🏗️ Tech Stack

- **Java 11** - Programming language
- **Spring Boot 2.7.18** - Application framework
- **Spring Data JPA** - Data access layer
- **Spring Security** - Authentication and authorization
- **PostgreSQL** - Database
- **Flyway** - Database migrations
- **JWT** - Token-based authentication
- **Lombok** - Boilerplate reduction
- **OpenAPI/Swagger** - API documentation
- **JUnit 5 + Mockito** - Testing framework

## 📁 Project Structure

```
src/
├── main/
│   ├── java/com/inventory/
│   │   ├── controller/         # REST API controllers
│   │   │   ├── AuthController.java
│   │   │   ├── ProductController.java
│   │   │   ├── WarehouseController.java
│   │   │   ├── InventoryController.java
│   │   │   ├── PurchaseOrderController.java
│   │   │   ├── StockAlertController.java
│   │   │   └── ReportingController.java
│   │   ├── service/           # Business logic layer
│   │   │   ├── ProductService.java
│   │   │   ├── WarehouseService.java
│   │   │   ├── InventoryService.java
│   │   │   ├── PurchaseOrderService.java
│   │   │   ├── StockAlertService.java
│   │   │   ├── ReportingService.java
│   │   │   ├── UserService.java
│   │   │   └── JwtService.java
│   │   ├── repository/        # Data access layer
│   │   │   ├── ProductRepository.java
│   │   │   ├── WarehouseRepository.java
│   │   │   ├── InventoryRepository.java
│   │   │   ├── PurchaseOrderRepository.java
│   │   │   ├── StockAlertRepository.java
│   │   │   └── UserRepository.java
│   │   ├── model/            # JPA entities
│   │   │   ├── Product.java
│   │   │   ├── Warehouse.java
│   │   │   ├── Inventory.java
│   │   │   ├── PurchaseOrder.java
│   │   │   ├── StockAlert.java
│   │   │   ├── InventoryMovement.java
│   │   │   └── User.java
│   │   ├── dto/              # Data transfer objects
│   │   │   ├── ProductRequestDTO.java
│   │   │   ├── ProductResponseDTO.java
│   │   │   ├── AuthRequestDTO.java
│   │   │   ├── AuthResponseDTO.java
│   │   │   └── ...
│   │   ├── config/           # Configuration classes
│   │   │   ├── SecurityConfig.java
│   │   │   └── JwtAuthFilter.java
│   │   ├── exception/        # Error handling
│   │   │   └── GlobalExceptionHandler.java
│   │   └── util/             # Utility classes
│   └── resources/
│       ├── application.properties
│       └── db/migration/     # Flyway migrations
│           ├── V1__baseline_schema.sql
│           ├── V2__create_purchase_order_table.sql
│           ├── V3__add_reorder_threshold_to_inventory.sql
│           ├── V4__create_stock_alert_table.sql
│           ├── V5__create_user_table.sql
│           └── V6__create_inventory_movement_table.sql
└── test/
    └── java/com/inventory/
        ├── controller/        # Controller tests
        ├── service/          # Service tests
        └── ImsBackendApplicationTests.java
```

## 🔐 Authentication & Security

### JWT Authentication
- **Token-based**: Secure JWT tokens for authentication
- **Role-based Access**: USER, MANAGER, ADMIN roles
- **BCrypt Password Hashing**: Secure password storage
- **CORS Configuration**: Frontend-backend communication

### Security Features
- **Spring Security**: Comprehensive security framework
- **Input Validation**: JSR-380 bean validation
- **SQL Injection Protection**: JPA/Hibernate protection
- **XSS Prevention**: Input sanitization and output encoding

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Core Operations
- `GET/POST/PUT/DELETE /api/products` - Product management
- `GET/POST/PUT/DELETE /api/warehouses` - Warehouse management
- `GET/POST/PUT /api/inventory` - Inventory tracking
- `GET/POST /api/purchase-orders` - Purchase order management
- `GET/POST/DELETE /api/stock-alerts` - Stock alerts

### Reporting
- `GET /api/reports/inventory-turnover` - Turnover analysis
- `GET /api/reports/stock-valuation` - Stock valuation
- `GET /api/reports/inventory-trends` - Trend analysis

## 🗄️ Database

### Schema
- **7 Core Tables**: Products, warehouses, inventory, purchase orders, stock alerts, inventory movements, users
- **Proper Relationships**: Foreign key constraints and referential integrity
- **Audit Fields**: Created/updated timestamps
- **UUID Primary Keys**: Scalable and secure

### Migrations
- **Flyway**: Version-controlled database schema
- **6 Migration Files**: Complete schema evolution
- **Rollback Support**: Safe schema changes

## 🧪 Testing

### Test Coverage
- **Controller Tests**: API endpoint testing with MockMvc
- **Service Tests**: Business logic testing with Mockito
- **Integration Tests**: End-to-end functionality testing
- **Validation Tests**: Input validation testing

### Running Tests
```bash
# Run all tests
mvn test

# Run specific test classes
mvn test -Dtest=ProductControllerTest
mvn test -Dtest=ProductServiceImplTest

# Run with coverage
mvn test jacoco:report

# Run integration tests
mvn test -Dtest=*IntegrationTest
```

## 🔧 Configuration

### Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/imsdb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA & Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Flyway Migrations
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration

# JWT Configuration
jwt.secret=replace_this_with_a_strong_secret

# Application
spring.application.name=ims-backend
server.port=8080
```

### Environment-Specific Configuration
- **Development**: Default properties
- **Production**: Environment variables for sensitive data
- **Testing**: H2 in-memory database

## 🚀 Deployment

### Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package
java -jar target/ims-backend-0.0.1-SNAPSHOT.jar
```

### Docker (Coming Soon)
```bash
# Build Docker image
docker build -t ims-backend .

# Run container
docker run -p 8080:8080 ims-backend
```

## 📚 API Documentation

### Swagger UI
- **URL**: http://localhost:8080/swagger-ui.html
- **OpenAPI Spec**: http://localhost:8080/v3/api-docs
- **Interactive Testing**: Test endpoints directly from browser

### Documentation Features
- **Complete API Coverage**: All endpoints documented
- **Request/Response Examples**: Real examples for each endpoint
- **Authentication**: JWT token integration
- **Error Responses**: Comprehensive error documentation

## 🔍 Development

### Code Standards
- **SOLID Principles**: Clean architecture and design
- **Layered Architecture**: Controller → Service → Repository
- **DTO Pattern**: Clean separation between entities and API
- **Exception Handling**: Global exception handler
- **Validation**: Comprehensive input validation

### Adding New Features
1. **Entity**: Create JPA entity in `model/` package
2. **Repository**: Create repository interface in `repository/` package
3. **Service**: Create service interface and implementation
4. **Controller**: Create REST controller in `controller/` package
5. **DTOs**: Create request/response DTOs
6. **Tests**: Add comprehensive unit and integration tests
7. **Migration**: Create Flyway migration if schema changes needed

## 🐛 Troubleshooting

### Common Issues
- **Database Connection**: Check PostgreSQL is running and credentials
- **Port Conflicts**: Ensure port 8080 is available
- **Migration Errors**: Check Flyway migration files
- **Authentication Issues**: Verify JWT configuration

### Debug Steps
1. Check application logs for errors
2. Verify database connectivity
3. Test API endpoints with Swagger UI
4. Check JWT token validity
5. Validate request/response formats

## 📈 Performance

### Optimization Features
- **Connection Pooling**: HikariCP for database connections
- **JPA Auditing**: Efficient timestamp management
- **Lazy Loading**: Optimized entity relationships
- **Query Optimization**: Efficient database queries

### Monitoring
- **Health Checks**: Application health endpoints
- **Metrics**: Performance monitoring (planned)
- **Logging**: Comprehensive application logging

## 🔒 Security Best Practices

### Production Deployment
- **Strong JWT Secret**: Use cryptographically secure secret
- **HTTPS**: Always use HTTPS in production
- **Environment Variables**: Secure configuration management
- **Database Security**: Proper database access controls
- **Input Validation**: Comprehensive validation on all inputs

## 📞 Support

For issues and questions:
1. Check the [documentation](../documentation/)
2. Review the [API documentation](./documentation/03-api-endpoints.md)
3. Check the [troubleshooting section](#troubleshooting)
4. Create an issue with detailed information

---

**Status**: Production Ready  
**Version**: 1.0.0  
**Java Version**: 11  
**Spring Boot Version**: 2.7.18  
**Last Updated**: January 2024