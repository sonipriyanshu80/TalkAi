# Models

MongoDB schemas using Mongoose for data persistence and business logic.

## Files

### Core Models
- `Company.model.js` - Company profile, subscription, and usage tracking
- `CompanyUser.model.js` - User accounts linked to companies
- `CallLog.model.js` - Call history, transcripts, and duration tracking

### Knowledge Base
- `KnowledgeBase.model.js` - Knowledge articles, PDFs, and content chunks
- `EscalationRule.model.js` - Call escalation trigger keywords

### Billing System
- `Plan.model.js` - Subscription plans with pricing and features
- `Transaction.model.js` - Payment history and balance changes

## Model Relationships

- Company → CompanyUser (1:many)
- Company → CallLog (1:many)
- Company → KnowledgeBase (1:many)
- Company → EscalationRule (1:many)
- Company → Transaction (1:many)
- Plan → Company (1:many via currentPlanId)

## Key Features

### Company Model
- Subscription management (currentPlanId, balance)
- Usage tracking (minutesUsed, kbUsedMB)
- Twilio integration (twilioNumber, forwardToNumber)
- Voice settings (languageMode, voiceType)

### Plan Model
- Pricing tiers (Free, Starter, Growth, Enterprise)
- Credit allocation and rate limits
- Feature definitions

### Transaction Model
- Payment tracking (Razorpay integration)
- Balance history
- Call deductions

### CallLog Model
- Call metadata (duration, cost, botName)
- Transcription and AI responses
- Escalation tracking

## Data Isolation

- Multi-tenant architecture with companyId scoping
- Soft delete support (isActive field)
- Automatic timestamps (createdAt, updatedAt)
- Enum validation for status and type fields