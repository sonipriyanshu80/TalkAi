const rateLimit = require("express-rate-limit");

//Base Limiter (global, soft)
const globalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: process.env.RATE_LIMIT_GLOBAL || 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        message: "Too many requests. Please try again later."
    }
});


// Strict limiter (auth endpoints)
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: process.env.RATE_LIMIT_AUTH || 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Try again later."
  }
});

module.exports = {
  globalLimiter,
  authLimiter
};