# Authentication Module Documentation

## Overview
The Authentication module provides JWT-based authentication and authorization for the Inventory Management System. It includes user registration, login, and role-based access control.

---

## Backend Implementation

### Entity: `User`
- `UUID id` (Primary key, auto-generated)
- `String username` (required, unique, max 50 chars)
- `String password` (required, hashed with BCrypt)
- `String role` (required, max 20 chars, e.g., "USER", "ADMIN", "MANAGER")

### Security Configuration
- **Spring Security** with JWT authentication
- **BCrypt** password hashing
- **CORS** configuration for frontend-backend communication
- **Stateless** session management

### JWT Service
- **Token Generation**: Creates JWT tokens with user claims
- **Token Validation**: Validates token authenticity and expiration
- **Token Extraction**: Extracts username and role from tokens
- **Expiration**: 24-hour token validity

### Authentication Flow
1. **Registration**: User creates account with username/password
2. **Login**: User authenticates and receives JWT token
3. **Authorization**: Token validated on each protected request
4. **Role-based Access**: Different endpoints require different roles

### Controllers
- `AuthController` at `/api/auth`
- Endpoints:
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login

### DTOs
- `AuthRequestDTO`: username, password
- `AuthResponseDTO`: token, username, role

---

## Frontend Implementation

### Authentication Pages
- **LoginPage**: User login form with validation
- **RegisterPage**: User registration form with validation

### Authentication Guards
- **RequireAuth**: Protects routes requiring authentication
- **Token Management**: Stores/retrieves JWT tokens in localStorage
- **Route Protection**: Redirects unauthenticated users to login

### Token Storage
- **localStorage**: Stores JWT token, username, and role
- **Automatic Cleanup**: Tokens persist across browser sessions
- **Security**: Tokens are automatically included in API requests

### Navigation Flow
1. **Unauthenticated**: Redirected to `/login`
2. **Login Success**: Redirected to `/home`
3. **Registration Success**: Redirected to `/home`
4. **Token Expiry**: Redirected to `/login`

---

## API Examples

### Registration

**Request:**
```json
POST /api/auth/register
{
  "username": "newuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "newuser",
  "role": "USER"
}
```

### Login

**Request:**
```json
POST /api/auth/login
{
  "username": "existinguser",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "existinguser",
  "role": "USER"
}
```

### Protected API Call

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## Role-Based Access Control

### User Roles
- **USER**: Basic access to products, warehouses, inventory
- **MANAGER**: User access + purchase orders, stock alerts
- **ADMIN**: Full access including reporting and system management

### Protected Endpoints
- **All CRUD operations**: Require authentication
- **Reporting endpoints**: Require ADMIN or MANAGER role
- **Authentication endpoints**: Public access

### Role Hierarchy
```
ADMIN > MANAGER > USER
```

---

## Security Features

### Password Security
- **BCrypt Hashing**: Passwords never stored in plain text
- **Salt**: Automatic salt generation for each password
- **Cost Factor**: Configurable hashing strength

### JWT Security
- **Secret Key**: Configurable secret for token signing
- **Expiration**: 24-hour token validity
- **Claims**: Username and role embedded in token
- **Validation**: Server-side token validation

### CORS Configuration
- **Allowed Origins**: Configured for frontend domain
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: All headers including Authorization
- **Credentials**: Enabled for cookie support

### Input Validation
- **Username**: Required, unique, max 50 characters
- **Password**: Required, minimum security requirements
- **Role**: Required, valid role values

---

## Error Handling

### Authentication Errors
- **Invalid Credentials**: 401 Unauthorized
- **Token Expired**: 401 Unauthorized
- **Invalid Token**: 401 Unauthorized
- **Registration Conflicts**: 400 Bad Request

### Error Response Format
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid username or password"
}
```

---

## Configuration

### Backend Configuration
```properties
# JWT Secret (change in production)
jwt.secret=replace_this_with_a_strong_secret

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/imsdb
spring.datasource.username=postgres
spring.datasource.password=postgres
```

### Frontend Configuration
```javascript
// Vite proxy configuration
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

---

## Testing

### Manual Testing
1. **Registration**: Create new user account
2. **Login**: Authenticate with credentials
3. **Protected Access**: Access protected endpoints
4. **Token Expiry**: Test token expiration handling
5. **Role Access**: Test different role permissions

### API Testing
```bash
# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Access protected endpoint
curl -X GET http://localhost:8080/api/products \
  -H "Authorization: Bearer <token>"
```

---

## Troubleshooting

### Common Issues
- **401 Unauthorized**: Check token validity and expiration
- **CORS Errors**: Verify CORS configuration
- **Token Not Stored**: Check localStorage access
- **Login Loop**: Verify token storage and retrieval

### Debug Steps
1. Check browser console for errors
2. Verify token in localStorage
3. Check network requests for authentication headers
4. Validate backend CORS configuration
5. Test API endpoints directly

---

## Security Best Practices

### Production Deployment
- **Strong JWT Secret**: Use cryptographically secure secret
- **HTTPS**: Always use HTTPS in production
- **Token Expiration**: Consider shorter token lifetimes
- **Rate Limiting**: Implement API rate limiting
- **Logging**: Monitor authentication attempts

### Code Security
- **Input Sanitization**: Validate all user inputs
- **Error Messages**: Don't expose sensitive information
- **Token Storage**: Consider httpOnly cookies for better security
- **Password Policy**: Implement strong password requirements

---

## Summary
- **Authentication**: JWT-based with Spring Security
- **Authorization**: Role-based access control
- **Frontend**: Protected routes with authentication guards
- **Security**: BCrypt password hashing, CORS configuration
- **Production Ready**: Comprehensive error handling and security features 