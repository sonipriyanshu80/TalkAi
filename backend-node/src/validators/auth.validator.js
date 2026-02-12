const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),

  companyName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Company name is required',
      'string.min': 'Company name must be at least 2 characters',
      'string.max': 'Company name cannot exceed 100 characters'
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character'
    })
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required()
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required'
  }),
  newPassword: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
    .required()
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 8 characters',
      'string.pattern.base': 'New password must contain uppercase, lowercase, number, and special character'
    })
});

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  companyName: Joi.string().trim().min(2).max(100).optional().messages({
    'string.min': 'Company name must be at least 2 characters',
    'string.max': 'Company name cannot exceed 100 characters'
  })
}).min(1);

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
  validateSignup: validate(signupSchema),
  validateLogin: validate(loginSchema),
  validateChangePassword: validate(changePasswordSchema),
  validateUpdateProfile: validate(updateProfileSchema)
};
