# Backend Node.js

Express.js API server for TalkAi with authentication, billing, analytics, and voice call management.

## Setup

```bash
npm install
npm start
```

## Environment Variables

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/talkai
JWT_SECRET=your_jwt_secret
CORS_ORIGINS=http://localhost:3000
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Features

- **Authentication**: JWT-based auth with company isolation
- **File Upload**: PDF processing with text extraction
- **Voice Integration**: Twilio webhook handling and call logging
- **Payment Processing**: Razorpay integration for subscriptions
- **Analytics**: Call metrics and performance tracking
- **Rate Limiting**: API protection and usage control
- **Multi-tenant**: Company-scoped data architecture

## Project Structure

- `src/controllers/` - Business logic and request handlers
- `src/models/` - MongoDB schemas and data models
- `src/routes/` - API endpoints and middleware
- `src/services/` - External service integrations
- `src/middleware/` - Authentication and validation
- `src/validators/` - Input validation schemas
- `src/config/` - Database and application configuration

## Dependencies

- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **Multer**: File upload handling
- **Joi**: Input validation
- **Winston**: Logging
- **Razorpay**: Payment processing