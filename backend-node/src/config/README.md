# Configuration

Application configuration modules for database, CORS, logging, and environment management.

## Files

- `cors.config.js` - CORS policy configuration with dynamic origin validation
- `db.js` - MongoDB connection setup using Mongoose with retry logic
- `logger.js` - Winston logger configuration with file rotation and error handling

## Features

### Database Configuration
- MongoDB connection with automatic reconnection
- Connection pooling and timeout handling
- Environment-based connection strings

### CORS Configuration
- Dynamic origin validation from environment variables
- Support for multiple frontend domains
- Credential handling for authenticated requests

### Logging Configuration
- File-based logging with rotation
- Console logging for development
- Error and combined log separation
- Timestamp and formatting

## Usage

```javascript
const connectDB = require('./config/db');
const logger = require('./config/logger');
const corsConfig = require('./config/cors.config');

// Database connection
await connectDB();

// Logging
logger.info('Application started');
logger.error('Error occurred', { error: err });

// CORS in Express
app.use(cors(corsConfig));
```

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `CORS_ORIGINS` - Comma-separated allowed origins
- `LOG_LEVEL` - Logging level (info, debug, error)