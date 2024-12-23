import Joi from 'joi';

const UserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(8)
    .min(3)
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 8 characters',
      'string.min': 'First name cannot be less than 3 characters',
      'string.pattern.base': 'First name must contain only letters',
    }),
  middleName: Joi.string()
    .optional()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'string.pattern.base': 'Middle name must contain only letters',
    }),
  lastName: Joi.string()
    .max(8)
    .min(3)
    .required()
    .pattern(/^[A-Z][a-zA-Z]*$/) // Ensuring first letter is uppercase
    .messages({
      'string.empty': 'Last name is required',
      'string.max': 'Last name cannot be more than 8 characters',
      'string.min': 'Last name cannot be less than 3 characters',
      'string.pattern.base':
        'Last name must start with an uppercase letter and contain only letters',
    }),
});
const StudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required',
    'any.required': 'ID is required',
  }),
  name: UserNameValidationSchema.required(),
  address: Joi.object({
    permanentAddress: Joi.string().required().messages({
      'string.empty': 'Permanent address is required',
    }),
    currentAddress: Joi.string().required().messages({
      'string.empty': 'Current address is required',
    }),
  }).required(),
  guardian: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Guardian name is required',
    }),
    contactNumber: Joi.string()
      .required()
      .pattern(/^\+?\d{10,11}$/)
      .messages({
        'string.empty': 'Guardian contact number is required',
        'string.pattern.base':
          'Guardian contact number must be a valid 10-digit number',
      }),
    relation: Joi.string().required().messages({
      'string.empty': 'Guardian relation is required',
    }),
  }).required(),
  age: Joi.number().required().messages({
    'number.base': 'Age is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
  }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'string.empty': 'Gender is required',
    'any.only': 'Gender must be Male or Female',
  }),
  contactNumber: Joi.string()
    .required()
    .pattern(/^\+?\d{10,11}$/)
    .messages({
      'string.empty': 'Contact number is required',
      'string.pattern.base': 'Contact number must be a valid 10-digit number',
    }),
  emergencyContactNumber: Joi.string()
    .required()
    .pattern(/^\+?\d{10,11}$/)
    .messages({
      'string.empty': 'Emergency contact number is required',
      'string.pattern.base':
        'Emergency contact number must be a valid 10-digit number',
    }),
  dateOfBirth: Joi.date().required().messages({
    'date.base': 'Date of birth is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only':
        'Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-',
    }),
  profilePicture: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

export default StudentValidationSchema;
