const Joi = require('joi');

const importTwilioSchema = Joi.object({
  accountSid: Joi.string().required().trim().min(34).max(34).pattern(/^AC[a-f0-9]{32}$/),
  authToken: Joi.string().required().trim().min(32).max(32)
});

const activateNumberSchema = Joi.object({
  phoneNumberId: Joi.string().required().trim()
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map(d => ({
        field: d.path.join('.'),
        message: d.message
      }))
    });
  }
  
  next();
};

module.exports = {
  validateImportTwilio: validate(importTwilioSchema),
  validateActivateNumber: validate(activateNumberSchema)
};
