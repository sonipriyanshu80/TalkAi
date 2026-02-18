# Controllers

API request handlers containing business logic for each feature module.

## Files

- `auth.controller.js` - User authentication and company registration
- `billing.controller.js` - Payment processing and subscription management
- `analytics.controller.js` - Call metrics and performance analytics
- `voice.controller.js` - Twilio webhook handling and call processing
- `knowledge.controller.js` - Knowledge base CRUD operations

## Controller Responsibilities

### Authentication Controller
- Company and user creation with validation
- JWT token generation and validation
- Password hashing and verification
- Email notifications for new accounts

### Billing Controller
- Razorpay order creation and verification
- Subscription plan management
- Balance tracking and deductions
- Transaction history and reporting
- Payment webhook processing

### Analytics Controller
- Call volume and duration calculations
- Date-based filtering and aggregation
- Performance metrics generation
- Real-time data updates

### Voice Controller
- Twilio webhook request processing
- Call logging and duration tracking
- AI backend integration for responses
- Call cost calculation and billing

### Knowledge Controller
- PDF upload and text extraction
- Content chunking for AI processing
- Search and pagination logic
- Company-scoped data access

## Common Patterns

- **Error Handling**: Try-catch blocks with structured error responses
- **Data Validation**: Input sanitization and business rule validation
- **Company Isolation**: All operations scoped to authenticated user's company
- **Logging**: Request tracking and error logging for debugging