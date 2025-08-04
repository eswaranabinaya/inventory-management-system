# 🔧 **Production Dependency Guide**

## 📋 **Dependency Issues Fixed**

### **✅ Backend Dependencies (Spring Boot)**

#### **Fixed Issues:**
1. **JWT Library Security Update**
   - **Before**: `jjwt:0.9.1` (vulnerable)
   - **After**: `jjwt-api:0.12.3`, `jjwt-impl:0.12.3`, `jjwt-jackson:0.12.3`
   - **Reason**: Security vulnerabilities in older version

2. **Validation API Conflicts**
   - **Removed**: Conflicting `javax.validation` dependency
   - **Kept**: `jakarta.validation-api` (Spring Boot managed)
   - **Reason**: Prevents class loading conflicts

3. **OpenAPI Documentation**
   - **Before**: `springdoc-openapi-ui:1.7.0`
   - **After**: `springdoc-openapi-starter-webmvc-ui:2.2.0`
   - **Reason**: Better Spring Boot 2.7.x compatibility

4. **JWT Service Updates**
   - Updated to use new JWT library API
   - Implemented secure key generation
   - Fixed deprecated method calls

### **✅ Frontend Dependencies (React/Vite)**

#### **Fixed Issues:**
1. **React Version Stability**
   - **Before**: `react:^19.1.0` (experimental)
   - **After**: `react:^18.2.0` (stable)
   - **Reason**: Better production stability

2. **Dependency Version Alignment**
   - Updated all dependencies to compatible versions
   - Ensured React ecosystem compatibility
   - Fixed potential build issues

3. **Build Optimization**
   - Updated Vite to latest stable version
   - Optimized development dependencies
   - Ensured production build compatibility

---

## 🚨 **Critical Production Dependencies**

### **Backend Requirements**
```xml
<!-- Core Spring Boot Dependencies -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

<!-- Security -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>

<!-- Documentation -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

### **Frontend Requirements**
```json
{
  "dependencies": {
    "axios": "^1.6.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  }
}
```

---

## 🔍 **Dependency Validation**

### **Pre-Deployment Checks**
```bash
# Run dependency check script
chmod +x check-dependencies.sh
./check-dependencies.sh
```

### **Manual Validation Steps**

#### **Backend Validation**
```bash
cd ims-backend

# Check Maven dependencies
mvn dependency:resolve

# Check for security vulnerabilities
mvn dependency:check

# Test build
mvn clean package -DskipTests

# Verify JAR file
java -jar target/ims-backend-0.0.1-SNAPSHOT.jar --version
```

#### **Frontend Validation**
```bash
cd ims-frontend

# Install dependencies
npm ci

# Check for vulnerabilities
npm audit --audit-level=moderate

# Test build
npm run build

# Verify build output
ls -la dist/
```

---

## 🛠️ **Troubleshooting Common Issues**

### **Backend Issues**

#### **1. JWT Library Compatibility**
```java
// Old API (deprecated)
Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();

// New API (current)
Jwts.parser()
    .verifyWith(getSigningKey())
    .build()
    .parseSignedClaims(token)
    .getPayload();
```

#### **2. Validation API Conflicts**
```xml
<!-- Remove conflicting dependency -->
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>

<!-- Use Spring Boot managed version -->
<dependency>
    <groupId>jakarta.validation</groupId>
    <artifactId>jakarta.validation-api</artifactId>
</dependency>
```

#### **3. Database Connection Issues**
```properties
# Ensure proper PostgreSQL driver
spring.datasource.driver-class-name=org.postgresql.Driver

# Check connection pool settings
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

### **Frontend Issues**

#### **1. React Version Conflicts**
```json
// Ensure consistent React ecosystem
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.1"
}
```

#### **2. Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
```

#### **3. Vite Configuration Issues**
```javascript
// Ensure proper Vite config
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

---

## 🔒 **Security Considerations**

### **JWT Security**
- ✅ **Updated to latest JWT library** (0.12.3)
- ✅ **Secure key generation** using `Keys.hmacShaKeyFor()`
- ✅ **Proper token validation** with new API
- ✅ **Environment variable secrets** (no hardcoded values)

### **Dependency Security**
- ✅ **Regular security audits** with `npm audit` and `mvn dependency:check`
- ✅ **Updated vulnerable dependencies**
- ✅ **Removed conflicting libraries**
- ✅ **Production-ready versions**

---

## 📊 **Performance Optimizations**

### **Backend Optimizations**
- ✅ **Connection pooling** (HikariCP)
- ✅ **JPA query optimization**
- ✅ **Caching configuration**
- ✅ **Compression enabled**

### **Frontend Optimizations**
- ✅ **Code splitting** (Vite build)
- ✅ **Asset compression** (Gzip)
- ✅ **Caching headers** (Static assets)
- ✅ **Tree shaking** (Unused code removal)

---

## 🚀 **Deployment Checklist**

### **Before Deployment**
- [ ] Run `./check-dependencies.sh`
- [ ] Verify all tests pass
- [ ] Check for security vulnerabilities
- [ ] Test production build
- [ ] Validate environment variables

### **During Deployment**
- [ ] Monitor build logs
- [ ] Check dependency resolution
- [ ] Verify health checks
- [ ] Test API endpoints
- [ ] Validate frontend functionality

### **After Deployment**
- [ ] Monitor application logs
- [ ] Check performance metrics
- [ ] Verify security headers
- [ ] Test user workflows
- [ ] Validate data persistence

---

## 📞 **Support Resources**

### **Dependency Management**
- **Maven**: [maven.apache.org](https://maven.apache.org)
- **npm**: [docs.npmjs.com](https://docs.npmjs.com)
- **Spring Boot**: [spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)

### **Security Resources**
- **npm audit**: [docs.npmjs.com/cli/v8/commands/npm-audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- **Maven dependency check**: [owasp.org/www-project-dependency-check](https://owasp.org/www-project-dependency-check)

---

**✅ Your application dependencies are now production-ready and secure!** 