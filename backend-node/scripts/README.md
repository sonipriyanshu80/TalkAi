# Scripts

Database seeding and utility scripts for TalkAi backend.

## Files

- `seedPlans.js` - Seed subscription plans into MongoDB

## Usage

### Seed Plans
```bash
cd backend-node
node scripts/seedPlans.js
```

This script will:
1. Connect to MongoDB using MONGO_URI from .env
2. Clear existing plans from database
3. Insert default subscription plans (Starter, Jump Starter, Growth, Enterprise)
4. Close database connection

## Requirements

- MongoDB connection configured in .env
- Plan model available in src/models/Plan.model.js

## Adding New Scripts

Place utility scripts in this folder for:
- Database migrations
- Data cleanup tasks
- Backup operations
- Deployment utilities