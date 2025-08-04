# IMS Frontend

React-based frontend for the Inventory Management System (IMS).

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **npm** or **yarn**

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Preview production build
npm run preview
```

## 🏗️ Tech Stack

- **React 19.1.0** - UI framework
- **Vite 7.0.4** - Build tool and dev server
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **React Router 7.7.1** - Client-side routing
- **Axios 1.11.0** - HTTP client for API calls
- **Vitest 3.2.4** - Testing framework

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── products/       # Product-specific components
│   ├── warehouses/     # Warehouse-specific components
│   └── inventory/      # Inventory-specific components
├── pages/              # Page components
│   ├── products/       # Product management pages
│   ├── warehouses/     # Warehouse management pages
│   ├── inventory/      # Inventory management pages
│   ├── purchaseOrders/ # Purchase order pages
│   └── reporting/      # Reporting and analytics pages
├── services/           # API service layer
│   ├── productService.js
│   ├── warehouseService.js
│   ├── inventoryService.js
│   └── ...
├── assets/             # Static assets
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🔐 Authentication

The frontend includes JWT-based authentication:

- **Login/Register**: User authentication pages
- **Protected Routes**: Route guards for authenticated users
- **Token Management**: Automatic token storage and retrieval
- **Role-Based Access**: Different UI based on user roles

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Reusable UI components
- **Consistent Theming**: Unified design system

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Testing Stack
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **Jest DOM**: Custom DOM element matchers

## 🔧 Configuration

### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

### Environment Variables
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=Inventory Management System
```

## 📱 Features

### Core Modules
- **Product Management**: CRUD operations with validation
- **Warehouse Management**: Multi-location tracking
- **Inventory Management**: Stock level monitoring
- **Purchase Orders**: Procurement workflow
- **Stock Alerts**: Threshold-based notifications
- **Reporting**: Analytics and insights dashboard

### User Experience
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Live data synchronization
- **Form Validation**: Client-side validation with feedback
- **Error Handling**: User-friendly error messages
- **Loading States**: Smooth loading indicators

## 🚀 Deployment

### Development
```bash
npm run dev
# Access at http://localhost:5173
```

### Production Build
```bash
npm run build
# Output in dist/ directory
```

### Preview Production Build
```bash
npm run preview
# Preview the production build locally
```

## 🔍 Development

### Code Standards
- **Functional Components**: Use React hooks
- **Component Structure**: Consistent file organization
- **Naming Conventions**: Clear and descriptive names
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimize re-renders and bundle size

### Adding New Features
1. Create components in appropriate directories
2. Add pages to the routing system
3. Create API services for backend communication
4. Add tests for new functionality
5. Update documentation

## 🐛 Troubleshooting

### Common Issues
- **CORS Errors**: Check Vite proxy configuration
- **Authentication Issues**: Verify JWT token handling
- **Build Errors**: Check Node.js version compatibility
- **Test Failures**: Ensure all dependencies are installed

### Debug Steps
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check network requests in dev tools
4. Validate environment variables
5. Review Vite configuration

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)

---

**Status**: Production Ready  
**Version**: 1.0.0  
**Last Updated**: January 2024
