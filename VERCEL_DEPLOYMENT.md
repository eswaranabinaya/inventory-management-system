# 🚀 **Vercel Deployment Guide for IMS**

## 📋 **Deployment Options**

### **🏆 Option 1: Hybrid (Recommended)**
- **Frontend**: Vercel (React/Vite)
- **Backend**: Railway (Spring Boot)
- **Database**: Railway PostgreSQL
- **Cost**: $0/month (free tiers)

### **🥈 Option 2: Full Vercel (Alternative)**
- **Frontend**: Vercel (React/Vite)
- **Backend**: Vercel Serverless (Node.js/Express)
- **Database**: Vercel Postgres
- **Cost**: $0/month (free tier) + $20/month (Postgres)

---

## 🚀 **Option 1: Hybrid Deployment (Recommended)**

### **Step 1: Deploy Backend to Railway**

1. **Follow Railway deployment** from `DEPLOYMENT.md`
2. **Get your Railway backend URL**: `https://your-backend.railway.app`
3. **Ensure backend is running** and accessible

### **Step 2: Deploy Frontend to Vercel**

#### **Method A: Vercel CLI (Recommended)**

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**:
   ```bash
   cd ims-frontend
   ```

4. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

5. **Configure environment variables**:
   ```bash
   vercel env add VITE_API_URL
   # Enter: https://your-backend-url.railway.app
   ```

#### **Method B: Vercel Dashboard**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Import Project** → Select your repository
4. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `ims-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app`

6. **Deploy**

### **Step 3: Configure CORS**

Update your Railway backend environment variables:
```bash
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## 🚀 **Option 2: Full Vercel Deployment**

### **Step 1: Rewrite Backend in Node.js**

Since Vercel doesn't support Java, we need to rewrite the backend. Here's the plan:

#### **Backend Structure (Node.js/Express)**
```
ims-backend-vercel/
├── api/
│   ├── auth/
│   │   ├── login.js
│   │   └── register.js
│   ├── products/
│   │   ├── index.js
│   │   └── [id].js
│   ├── warehouses/
│   │   ├── index.js
│   │   └── [id].js
│   ├── inventory/
│   │   ├── index.js
│   │   └── [id].js
│   └── reports/
│       ├── inventory-turnover.js
│       └── stock-valuation.js
├── lib/
│   ├── db.js
│   ├── auth.js
│   └── validation.js
├── package.json
└── vercel.json
```

#### **Key Changes Required**
1. **Database**: Use Vercel Postgres or external PostgreSQL
2. **Authentication**: JWT with Node.js
3. **API Routes**: Serverless functions
4. **Validation**: Joi or similar
5. **ORM**: Prisma or Sequelize

### **Step 2: Deploy Full Stack to Vercel**

1. **Create new repository** for Vercel backend
2. **Implement Node.js backend** (estimated 2-3 days)
3. **Deploy to Vercel** with both frontend and backend
4. **Configure Vercel Postgres**

---

## 🔧 **Vercel Configuration Files**

### **Frontend Vercel Config** (`ims-frontend/vercel.json`)
```json
{
  "version": 2,
  "name": "ims-frontend",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

### **Backend Vercel Config** (if using Option 2)
```json
{
  "version": 2,
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

---

## 🧪 **Testing Vercel Deployment**

### **Health Checks**
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.railway.app/api/actuator/health`

### **API Testing**
- **Swagger UI**: `https://your-backend.railway.app/api/swagger-ui.html`
- **Frontend API calls**: Should work with Railway backend

### **User Testing**
1. **Register** new user
2. **Login** with credentials
3. **Test** CRUD operations
4. **Verify** data persistence

---

## 🔄 **CI/CD with Vercel**

### **Automatic Deployment**
- **Push to main branch** → Automatic deployment
- **Preview deployments** for pull requests
- **Branch deployments** for testing

### **Environment Variables**
- **Production**: Set in Vercel dashboard
- **Preview**: Inherit from production
- **Development**: Use `.env.local`

---

## 💰 **Cost Comparison**

### **Option 1: Hybrid (Recommended)**
```
Railway (Backend + Database):
├── Free Tier: $0/month
└── Pro Plan: $10/month

Vercel (Frontend):
├── Free Tier: $0/month
└── Pro Plan: $20/month

Total: $0/month (free) or $30/month (pro)
```

### **Option 2: Full Vercel**
```
Vercel (Frontend + Backend):
├── Free Tier: $0/month
└── Pro Plan: $20/month

Vercel Postgres:
├── Starter: $20/month
└── Pro: $50/month

Total: $20/month (starter) or $70/month (pro)
```

---

## 🛠️ **Migration Guide: Java to Node.js**

If you choose Option 2, here's the migration plan:

### **Phase 1: Setup Node.js Backend (1-2 days)**
1. **Create Express.js application**
2. **Setup Prisma ORM** for database
3. **Implement JWT authentication**
4. **Create API routes** (matching current endpoints)

### **Phase 2: Database Migration (1 day)**
1. **Setup Vercel Postgres**
2. **Create Prisma schema**
3. **Migrate existing data**
4. **Test data integrity**

### **Phase 3: API Implementation (2-3 days)**
1. **Auth endpoints** (login, register)
2. **CRUD operations** (products, warehouses, inventory)
3. **Reporting endpoints**
4. **Validation and error handling**

### **Phase 4: Testing & Deployment (1 day)**
1. **Unit tests** with Jest
2. **Integration tests**
3. **Deploy to Vercel**
4. **Update frontend API URLs**

---

## 🆘 **Troubleshooting**

### **Common Vercel Issues**

1. **Build Failures**
   ```bash
   # Check build logs
   vercel logs
   
   # Test build locally
   npm run build
   ```

2. **Environment Variables**
   ```bash
   # List environment variables
   vercel env ls
   
   # Add environment variable
   vercel env add VITE_API_URL
   ```

3. **API Proxy Issues**
   - Check `vercel.json` routes configuration
   - Verify API URL in environment variables
   - Test API endpoints directly

4. **CORS Issues**
   - Update backend CORS configuration
   - Check frontend API calls
   - Verify HTTPS URLs

### **Vercel Support**
- **Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status**: [vercel-status.com](https://vercel-status.com)

---

## 🎯 **Recommendation**

### **For Quick Deployment: Option 1 (Hybrid)**
- ✅ **Fastest deployment** (30 minutes)
- ✅ **No code changes** required
- ✅ **Leverages platform strengths**
- ✅ **Cost-effective** ($0/month free tier)

### **For Full Vercel: Option 2 (Full Stack)**
- ✅ **Single platform** management
- ✅ **Better integration** potential
- ✅ **Serverless architecture**
- ❌ **Requires backend rewrite** (3-5 days)
- ❌ **Higher cost** ($20+/month)

---

## 🚀 **Quick Start Commands**

### **Option 1: Hybrid Deployment**
```bash
# 1. Deploy backend to Railway (follow DEPLOYMENT.md)
# 2. Deploy frontend to Vercel
cd ims-frontend
vercel --prod

# 3. Set environment variable
vercel env add VITE_API_URL
# Enter your Railway backend URL
```

### **Option 2: Full Vercel (Future)**
```bash
# 1. Create new backend repository
# 2. Implement Node.js backend
# 3. Deploy to Vercel
vercel --prod
```

---

**🎉 Choose Option 1 for immediate deployment or Option 2 for full Vercel integration!** 