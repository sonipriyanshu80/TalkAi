# Middleware

Express middleware for authentication, error handling, rate limiting, and request processing.

## Files

- `auth.middleware.js` - JWT token validation and user context injection
- `errorHandler.middleware.js` - Global error handling, logging, and response formatting
- `rateLimit.middleware.js` - Rate limiting for API endpoints with different tiers
- `requestId.middleware.js` - Unique request ID generation for tracing
- `role.middleware.js` - Role-based access control and permissions

## Features

### Authentication Middleware
- JWT token validation with expiration checks
- User context injection (userId, companyId, role)
- Company-scoped data access control
- Token refresh handling

### Error Handler
- Global error catching and formatting
- Structured error responses
- Error logging with request context
- Development vs production error details

### Rate Limiting
- Per-IP rate limiting
- Different limits for auth vs general endpoints
- Redis-based distributed rate limiting (optional)
- Custom rate limit responses

### Role-based Access
- Company admin vs user permissions
- Resource-level access control
- Multi-tenant permission isolation

## Usage

```javascript
const auth = require('./middleware/auth.middleware');
const role = require('./middleware/role.middleware');
const rateLimit = require('./middleware/rateLimit.middleware');

// Protected route with role check
router.post('/', 
  rateLimit.general,
  auth, 
  role('company_admin'), 
  controller.create
);

// Auth endpoints with stricter rate limiting
router.post('/login', 
  rateLimit.auth, 
  controller.login
);
```

## Auth Flow

1. Extract Bearer token from Authorization header
2. Verify JWT signature and expiration
3. Decode user payload (userId, companyId, role)
4. Add user context to req.user for downstream use
5. Ensure company-scoped data access