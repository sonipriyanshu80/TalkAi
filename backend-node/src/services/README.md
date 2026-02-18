# Services

Business logic and external service integrations for TalkAi platform.

## Files

- `aiService.js` - AI backend integration and response processing
- `twilioService.js` - Voice call handling and webhook processing
- `emailService.js` - Email notifications using Resend
- `encryptionService.js` - Data encryption and decryption utilities

## Features

### AI Service Integration
- Communication with Python FastAPI backend
- Voice call processing and AI response generation
- Error handling and fallback mechanisms
- Request/response formatting

### Twilio Voice Service
- Incoming call webhook handling
- Call routing and forwarding
- Call logging and duration tracking
- TwiML response generation

### Email Service
- Welcome emails for new users
- Password reset notifications
- Billing and subscription updates
- Template-based email formatting

### Encryption Service
- Sensitive data encryption (Twilio credentials)
- Secure key management
- Data decryption for API calls
- AES-256 encryption standard

## Usage

```javascript
const aiService = require('./services/aiService');
const twilioService = require('./services/twilioService');
const emailService = require('./services/emailService');

// Process AI response
const aiResponse = await aiService.processVoiceCall(callData);

// Handle Twilio webhook
const twimlResponse = await twilioService.handleIncomingCall(req.body);

// Send welcome email
await emailService.sendWelcomeEmail(user.email, user.name);
```

## External Dependencies

- **AI Backend**: Python FastAPI service for AI processing
- **Twilio**: Voice call infrastructure and webhooks
- **Resend**: Email delivery service
- **MongoDB**: Data persistence and logging