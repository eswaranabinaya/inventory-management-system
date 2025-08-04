#!/bin/bash

echo "🔍 Checking dependencies for production deployment..."

# Check backend dependencies
echo "📦 Checking Backend Dependencies..."
cd ims-backend

# Check Maven dependencies
echo "  - Checking Maven dependencies..."
if mvn dependency:resolve > /dev/null 2>&1; then
    echo "    ✅ Maven dependencies resolved successfully"
else
    echo "    ❌ Maven dependency resolution failed"
    exit 1
fi

# Check for security vulnerabilities
echo "  - Checking for security vulnerabilities..."
if mvn dependency:check > /dev/null 2>&1; then
    echo "    ✅ No security vulnerabilities found"
else
    echo "    ⚠️  Security vulnerabilities detected - review required"
fi

# Check Java version compatibility
echo "  - Checking Java version..."
java_version=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$java_version" -ge 11 ]; then
    echo "    ✅ Java version $java_version is compatible"
else
    echo "    ❌ Java version $java_version is not compatible (requires Java 11+)"
    exit 1
fi

cd ..

# Check frontend dependencies
echo "📦 Checking Frontend Dependencies..."
cd ims-frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "  - Installing npm dependencies..."
    npm ci
fi

# Check for outdated packages
echo "  - Checking for outdated packages..."
npm outdated --depth=0

# Check for security vulnerabilities
echo "  - Checking for security vulnerabilities..."
npm audit --audit-level=moderate

# Test build
echo "  - Testing production build..."
if npm run build > /dev/null 2>&1; then
    echo "    ✅ Production build successful"
else
    echo "    ❌ Production build failed"
    exit 1
fi

cd ..

echo "✅ Dependency check completed successfully!"
echo ""
echo "🚀 Ready for production deployment!"
echo "📋 Next steps:"
echo "  1. Deploy backend to Railway"
echo "  2. Deploy frontend to Vercel"
echo "  3. Configure environment variables"
echo "  4. Test the deployment" 