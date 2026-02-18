# Source Structure

Main application source code organized by functionality and feature modules.

## Directory Structure

- `config/` - Database, CORS, and logging configuration
- `controllers/` - Request handlers for API endpoints (auth, billing, voice, analytics)
- `middleware/` - Authentication, error handling, rate limiting, and validation
- `models/` - MongoDB schemas and data models (Company, User, CallLog, Plan, Transaction)
- `routes/` - API route definitions and middleware binding
- `services/` - Business logic and external service integrations
- `validators/` - Input validation schemas using Joi

## Entry Points

- `app.js` - Express application setup, middleware configuration, and route mounting
- `server.js` - Server startup, database connection, and environment setup

## Features

- **Multi-tenant Architecture**: Company-scoped data isolation
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: PDF processing with text extraction
- **Payment Integration**: Razorpay payment processing
- **Voice Integration**: Twilio webhook handling
- **Analytics**: Call metrics and performance tracking
- **Rate Limiting**: API protection and usage control