const logger = require("../config/logger");

module.exports = (err, req, res, next) => {
  logger.error("Unhandled error", {
    requestId: req.id,
    method: req.method,
    url: req.originalUrl,
    error: err.message,
    stack: err.stack
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    requestId: req.id
  });
};