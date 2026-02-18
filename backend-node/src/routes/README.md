# Routes

API route definitions with middleware, validation, and controller bindings.

## Files

- `auth.routes.js` - Authentication endpoints (signup, login)
- `knowledge.routes.js` - Knowledge base CRUD and file upload operations
- `voice.routes.js` - Voice call handling and call logs
- `billing.routes.js` - Payment processing and subscription management
- `analytics.routes.js` - Call analytics and performance metrics
- `protected.routes.js` - Protected user profile endpoints
- `health.routes.js` - Application health check

## Route Structure

```
/api/v1/auth
├── POST /signup - Company and user registration
└── POST /login - User authentication with JWT

/api/v1/knowledge
├── POST / - Create knowledge item
├── GET / - List knowledge items with pagination
├── POST /upload - Upload and process PDF files
├── PUT /:id - Update knowledge item
├── DELETE /:id - Soft delete knowledge item
└── PUT /:id/toggle - Toggle use in voice calls

/api/v1/voice
├── POST /webhook - Twilio voice webhook handler
└── GET /logs - Call history with filtering

/api/v1/billing
├── GET /balance - Account balance and plan info
├── GET /plans - Available subscription plans
├── POST /order - Create Razorpay payment order
├── POST /verify - Verify payment signature
├── POST /webhook - Payment webhook handler
└── GET /transactions - Transaction history

/api/v1/analytics
├── GET / - Call analytics with date filtering
└── GET /last-call-time - Latest call timestamp

/api/v1/protected
└── GET /me - Get user profile and company info

/health
└── GET / - Application health status
```

## Middleware Stack

- **Rate Limiting**: Applied per route type (auth vs general)
- **Authentication**: JWT validation for protected routes
- **Validation**: Joi schema validation for request bodies
- **Role Checking**: Company admin vs user permissions
- **Error Handling**: Global error catching and formatting

## Security

- All routes except auth and health require JWT authentication
- Company-scoped data access (multi-tenant isolation)
- Input validation and sanitization
- Rate limiting to prevent abuse