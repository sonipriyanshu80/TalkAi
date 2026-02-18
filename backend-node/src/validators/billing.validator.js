const Joi = require('joi');

const topupSchema = Joi.object({
  amount: Joi.number().min(100).required().messages({
    'number.min': 'Minimum topup amount is ₹100',
    'number.base': 'Amount must be a number',
    'any.required': 'Amount is required'
  }),
  type: Joi.string().valid('topup', 'subscription').required(),
  planId: Joi.string().optional()
});

const upgradePlanSchema = Joi.object({
  planId: Joi.string().required().messages({
    'string.empty': 'Plan ID is required',
    'any.required': 'Plan ID is required'
  })
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
  validateTopup: validate(topupSchema)
};
