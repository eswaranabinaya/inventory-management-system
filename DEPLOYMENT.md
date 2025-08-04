# 🚀 IMS Deployment Guide

## 📋 **Platform Recommendations**

### **🏆 PRIMARY: Railway**
- **Best for**: Full-stack Java + React applications
- **Pros**: Native Java support, PostgreSQL, generous free tier, auto-deployment
- **Cost**: Free tier available, then $5/month per service

### **🥈 ALTERNATIVE: Render**
- **Best for**: Production deployments
- **Pros**: Good Java support, PostgreSQL available
- **Cost**: $7/month per service, PostgreSQL $7/month

### **🥉 ALTERNATIVE: Vercel (Frontend Only)**
- **Best for**: React frontend only
- **Pros**: Excellent React support, free tier
- **Cons**: Need separate backend deployment

---

## 🚀 **Railway Deployment (Recommended)**

### **Step 1: Prepare Your Repository**

1. **Fork/Clone** this repository
2. **Push** to your GitHub account
3. **Ensure** all files are committed:
   - `Dockerfile` (backend)
   - `ims-frontend/Dockerfile` (frontend)
   - `railway.json` (backend config)
   - `ims-frontend/railway.json` (frontend config)

### **Step 2: Set Up Railway Account**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project

### **Step 3: Deploy Backend**

1. **Add Service** → **GitHub Repo** → Select your repository
2. **Configure**:
   - **Root Directory**: `ims-backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/ims-backend-0.0.1-SNAPSHOT.jar`

3. **Add Environment Variables**:
   ```bash
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=your-super-secret-jwt-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-admin-password
   FRONTEND_URL=https://your-frontend-url.railway.app
   ```

### **Step 4: Add PostgreSQL Database**

1. **Add Service** → **Database** → **PostgreSQL**
2. **Connect** to your backend service
3. **Environment Variables** will be auto-added:
   ```bash
   DATABASE_URL=postgresql://...
   DB_USERNAME=postgres
   DB_PASSWORD=...
   ```

### **Step 5: Deploy Frontend**

1. **Add Service** → **GitHub Repo** → Select your repository
2. **Configure**:
   - **Root Directory**: `ims-frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`

3. **Add Environment Variables**:
   ```bash
   VITE_API_URL=https://your-backend-url.railway.app
   ```

### **Step 6: Configure Domains**

1. **Backend**: Get your Railway URL
2. **Frontend**: Get your Railway URL
3. **Update** frontend environment variable with backend URL
4. **Update** backend environment variable with frontend URL

---

## 🔧 **Environment Variables Reference**

### **Backend Environment Variables**
```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database
DB_USERNAME=postgres
DB_PASSWORD=your-db-password

# JWT Security
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Admin User
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.railway.app

# Server
PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

### **Frontend Environment Variables**
```bash
# Backend API URL
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🧪 **Testing Deployment**

### **Health Checks**
- **Backend**: `https://your-backend-url.railway.app/api/actuator/health`
- **Frontend**: `https://your-frontend-url.railway.app/health`

### **API Documentation**
- **Swagger UI**: `https://your-backend-url.railway.app/api/swagger-ui.html`

### **Test User Registration**
1. Go to your frontend URL
2. Register a new user
3. Login with credentials
4. Test CRUD operations

---

## 🔄 **CI/CD with GitHub Actions**

### **Setup GitHub Secrets**
1. Go to your GitHub repository → **Settings** → **Secrets**
2. Add `RAILWAY_TOKEN` (get from Railway dashboard)

### **Automatic Deployment**
- **Push to main branch** → Automatic deployment
- **Pull requests** → Run tests only

---

## 🛠️ **Alternative Platforms**

### **Render Deployment**

1. **Create Render Account**
2. **New Web Service** → Connect GitHub
3. **Configure**:
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/ims-backend-0.0.1-SNAPSHOT.jar`
   - **Environment**: Java

4. **Add PostgreSQL** service
5. **Set environment variables** (same as Railway)

### **Vercel Deployment (Frontend Only)**

1. **Import** your GitHub repository
2. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `ims-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**:
   ```bash
   VITE_API_URL=https://your-backend-url.com
   ```

---

## 🔒 **Security Checklist**

### **Before Production**
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Change default admin credentials
- [ ] Use HTTPS URLs for CORS
- [ ] Set up proper database credentials
- [ ] Enable health checks
- [ ] Configure logging

### **Security Best Practices**
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic on Railway)
- [ ] Regular security updates
- [ ] Monitor application logs
- [ ] Backup database regularly

---

## 📊 **Monitoring & Maintenance**

### **Railway Dashboard**
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, network usage
- **Deployments**: Deployment history and rollbacks

### **Health Monitoring**
- **Backend**: `/api/actuator/health`
- **Frontend**: `/health`
- **Database**: Connection status

### **Backup Strategy**
- **Database**: Railway PostgreSQL has automatic backups
- **Code**: GitHub repository
- **Environment**: Railway environment variables

---

## 🆘 **Troubleshooting**

### **Common Issues**

1. **Build Failures**
   - Check Java version (11)
   - Verify Maven dependencies
   - Check Dockerfile syntax

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check PostgreSQL service status
   - Verify environment variables

3. **CORS Issues**
   - Update FRONTEND_URL in backend
   - Check CORS configuration
   - Verify HTTPS URLs

4. **JWT Issues**
   - Generate new JWT_SECRET
   - Check token expiration
   - Verify JWT configuration

### **Support Resources**
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Spring Boot Docs**: [spring.io](https://spring.io)
- **React Docs**: [react.dev](https://react.dev)

---

## 📈 **Scaling Considerations**

### **Railway Scaling**
- **Free Tier**: 1 service, 512MB RAM
- **Pro Plan**: $5/month per service, 1GB RAM
- **Auto-scaling**: Available on paid plans

### **Performance Optimization**
- **Database Indexing**: Add indexes for frequently queried fields
- **Caching**: Implement Redis for session storage
- **CDN**: Use Cloudflare for static assets
- **Load Balancing**: Multiple instances on paid plans

---

**🎉 Your IMS application is now production-ready!** 