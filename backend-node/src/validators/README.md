# Validators

Input validation schemas using Joi for request data validation and sanitization.

## Files

- `auth.validator.js` - Signup and login validation schemas
- `knowledge.validator.js` - Knowledge base item validation
- `billing.validator.js` - Payment and billing validation schemas

## Validation Schemas

### Auth Validation

**Signup Schema:**
- `companyName` - 2-100 characters, required
- `email` - Valid email format, required, lowercase
- `password` - Min 8 chars, must contain uppercase, lowercase, number, special character
- `industry` - Optional string, max 100 characters
- `businessDescription` - Optional string, max 500 characters

**Login Schema:**
- `email` - Valid email format, required
- `password` - Required string

### Knowledge Validation

**Create/Update Schema:**
- `title` - 1-200 characters, required
- `content` - 1-10000 characters, required
- `category` - Optional string from predefined list
- `useInCalls` - Boolean, default true

### Billing Validation

**Create Order Schema:**
- `amount` - Positive number, min 100, max 100000
- `type` - Enum: 'topup' or 'subscription'
- `planId` - Valid ObjectId (for subscription orders)

**Payment Verification Schema:**
- `razorpay_order_id` - Required string
- `razorpay_payment_id` - Required string
- `razorpay_signature` - Required string
- `planId` - Optional ObjectId

## Features

- **Data Sanitization**: Automatic trimming and formatting
- **Type Coercion**: String to number conversion where appropriate
- **Custom Messages**: User-friendly error messages
- **Conditional Validation**: Different rules based on request type
- **Security**: XSS prevention and input sanitization

## Usage

```javascript
const { validateSignup, validateLogin } = require('../validators/auth.validator');
const { validateCreateOrder } = require('../validators/billing.validator');

// Apply validation middleware
router.post('/signup', validateSignup, controller.signup);
router.post('/billing/order', validateCreateOrder, controller.createOrder);
```

## Error Handling

Validation errors return 400 status with detailed field-level error messages:

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Email must be a valid email address",
    "password": "Password must be at least 8 characters long"
  }
}
```