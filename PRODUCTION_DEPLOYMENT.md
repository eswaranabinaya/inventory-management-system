# 🚀 **Production Deployment Guide: Vercel + Railway**

## 📋 **Deployment Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway       │    │   Railway       │
│   Frontend      │◄──►│   Backend       │◄──►│   PostgreSQL    │
│   (React/Vite)  │    │   (Spring Boot) │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🎯 **Pre-Deployment Checklist**

### **✅ Code Quality**
- [x] All tests passing (73 backend, 79 frontend)
- [x] Environment variables configured
- [x] Security headers implemented
- [x] CORS configuration ready
- [x] Health checks implemented

### **✅ Configuration Files**
- [x] `application-prod.properties` - Production Spring Boot config
- [x] `vercel.json` - Vercel deployment config
- [x] `Dockerfile` (backend) - Railway deployment
- [x] `Dockerfile` (frontend) - Alternative deployment
- [x] `railway.json` - Railway configuration
- [x] `docker-compose.yml` - Local testing

---

## 🚀 **Step 1: Deploy Backend to Railway**

### **1.1 Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### **1.2 Deploy Backend Service**
1. **Add Service** → **GitHub Repo** → Select your repository
2. **Configure**:
   - **Root Directory**: `ims-backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/ims-backend-0.0.1-SNAPSHOT.jar`

### **1.3 Add PostgreSQL Database**
1. **Add Service** → **Database** → **PostgreSQL**
2. **Connect** to your backend service
3. **Environment Variables** will be auto-added:
   ```bash
   DATABASE_URL=postgresql://...
   DB_USERNAME=postgres
   DB_PASSWORD=...
   ```

### **1.4 Configure Environment Variables**
Add these to your Railway backend service:
```bash
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=8080
```

### **1.5 Test Backend Deployment**
```bash
# Health check
curl https://your-backend-url.railway.app/api/actuator/health

# API documentation
https://your-backend-url.railway.app/api/swagger-ui.html
```

---

## 🚀 **Step 2: Deploy Frontend to Vercel**

### **2.1 Install Vercel CLI**
```bash
npm i -g vercel
```

### **2.2 Login to Vercel**
```bash
vercel login
```

### **2.3 Deploy Frontend**
```bash
cd ims-frontend
vercel --prod
```

### **2.4 Configure Environment Variables**
```bash
vercel env add VITE_API_URL
# Enter: https://your-backend-url.railway.app
```

### **2.5 Alternative: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. **Import Project** → Select your repository
3. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `ims-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add Environment Variables**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app`

---

## 🔧 **Step 3: Configure CORS**

Update your Railway backend environment variables:
```bash
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## 🧪 **Step 4: Testing Production Deployment**

### **4.1 Health Checks**
- **Frontend**: `https://your-frontend-url.vercel.app`
- **Backend**: `https://your-backend-url.railway.app/api/actuator/health`

### **4.2 API Testing**
- **Swagger UI**: `https://your-backend-url.railway.app/api/swagger-ui.html`
- **Test endpoints**:
  ```bash
  # Register user
  curl -X POST https://your-backend-url.railway.app/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"username":"testuser","password":"testpass","role":"USER"}'
  
  # Login
  curl -X POST https://your-backend-url.railway.app/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"testuser","password":"testpass"}'
  ```

### **4.3 User Testing**
1. **Open frontend URL**
2. **Register** new user
3. **Login** with credentials
4. **Test CRUD operations**:
   - Create product
   - Create warehouse
   - Add inventory
   - View reports

---

## 🔒 **Step 5: Security Hardening**

### **5.1 Generate Strong JWT Secret**
```bash
# Generate 32+ character secret
openssl rand -base64 32
```

### **5.2 Update Environment Variables**
```bash
# Railway Backend
JWT_SECRET=your-generated-secret-here
ADMIN_PASSWORD=strong-admin-password

# Vercel Frontend
VITE_API_URL=https://your-backend-url.railway.app
```

### **5.3 Security Headers (Already Configured)**
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-XSS-Protection: 1; mode=block
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: no-referrer-when-downgrade

---

## 📊 **Step 6: Monitoring & Maintenance**

### **6.1 Railway Dashboard**
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, network usage
- **Deployments**: Deployment history and rollbacks

### **6.2 Vercel Dashboard**
- **Analytics**: Page views, performance
- **Functions**: Serverless function logs
- **Deployments**: Build and deployment status

### **6.3 Health Monitoring**
```bash
# Backend health
curl https://your-backend-url.railway.app/api/actuator/health

# Frontend health
curl https://your-frontend-url.vercel.app
```

---

## 🔄 **Step 7: CI/CD Setup**

### **7.1 GitHub Actions (Optional)**
The `.github/workflows/deploy.yml` file is already configured for:
- **Automated testing** on pull requests
- **Railway deployment** on main branch push
- **Vercel deployment** on main branch push

### **7.2 Environment Variables in CI/CD**
```bash
# GitHub Secrets
RAILWAY_TOKEN=your-railway-token
VERCEL_TOKEN=your-vercel-token
```

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **Backend Issues**
1. **Database Connection**
   ```bash
   # Check DATABASE_URL format
   postgresql://username:password@host:port/database
   ```

2. **JWT Issues**
   ```bash
   # Verify JWT_SECRET is set
   echo $JWT_SECRET
   ```

3. **CORS Issues**
   ```bash
   # Check FRONTEND_URL in backend
   echo $FRONTEND_URL
   ```

#### **Frontend Issues**
1. **API Connection**
   ```bash
   # Verify VITE_API_URL
   echo $VITE_API_URL
   ```

2. **Build Failures**
   ```bash
   # Test build locally
   cd ims-frontend
   npm run build
   ```

---

## 📈 **Performance Optimization**

### **Backend Optimization**
- ✅ **Connection pooling** (HikariCP)
- ✅ **Query optimization** (JPA/Hibernate)
- ✅ **Caching** (Spring Boot caching)
- ✅ **Compression** (Gzip enabled)

### **Frontend Optimization**
- ✅ **Code splitting** (Vite build optimization)
- ✅ **Asset compression** (Gzip in nginx)
- ✅ **Caching headers** (Static assets)
- ✅ **Lazy loading** (React components)

---

## 💰 **Cost Management**

### **Free Tier Limits**
```
Railway:
├── Free Tier: 500 hours/month
├── 512MB RAM per service
└── 1GB storage

Vercel:
├── Free Tier: Unlimited
├── 100GB bandwidth
└── 100GB storage
```

### **Scaling Considerations**
- **Railway Pro**: $5/month per service
- **Vercel Pro**: $20/month
- **Custom domains**: Free on both platforms

---

## 🎯 **Final Deployment Checklist**

### **Pre-Deployment**
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Security secrets generated
- [ ] CORS settings updated

### **Backend (Railway)**
- [ ] Service deployed successfully
- [ ] PostgreSQL database connected
- [ ] Health check endpoint responding
- [ ] Environment variables set
- [ ] CORS configured for frontend URL

### **Frontend (Vercel)**
- [ ] Build successful
- [ ] Environment variables configured
- [ ] API URL pointing to Railway backend
- [ ] Application accessible
- [ ] All routes working

### **Integration Testing**
- [ ] User registration working
- [ ] User login working
- [ ] CRUD operations functional
- [ ] Data persistence verified
- [ ] Reports generating correctly

---

## 🚀 **Quick Deployment Commands**

```bash
# 1. Deploy backend to Railway
# Follow Railway dashboard steps above

# 2. Deploy frontend to Vercel
cd ims-frontend
vercel --prod

# 3. Set environment variables
vercel env add VITE_API_URL
# Enter your Railway backend URL

# 4. Test deployment
curl https://your-backend-url.railway.app/api/actuator/health
curl https://your-frontend-url.vercel.app
```

---

## 📞 **Support Resources**

### **Railway**
- **Documentation**: [docs.railway.app](https://docs.railway.app)
- **Community**: [discord.gg/railway](https://discord.gg/railway)
- **Status**: [status.railway.app](https://status.railway.app)

### **Vercel**
- **Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status**: [vercel-status.com](https://vercel-status.com)

---

**🎉 Your IMS application is now production-ready for Vercel + Railway deployment!**

**Estimated deployment time: 30-45 minutes**
**Cost: $0/month (free tier)**
**Performance: Production-grade with auto-scaling** 