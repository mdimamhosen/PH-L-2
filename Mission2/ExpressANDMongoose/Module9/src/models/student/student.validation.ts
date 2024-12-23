import { z } from 'zod';

const UsernameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name cannot be less than 3 characters')
    .max(8, 'First name cannot be more than 8 characters')
    .nonempty('First name is required')
    .regex(/^[a-zA-Z]+$/, 'First name must contain only letters'),
  middleName: z
    .string()
    .regex(/^[a-zA-Z]+$/, 'Middle name must contain only letters')
    .optional(),
  lastName: z
    .string()
    .min(3, 'Last name cannot be less than 3 characters')
    .max(8, 'Last name cannot be more than 8 characters')
    .nonempty('Last name is required')
    .regex(
      /^[A-Z][a-zA-Z]*$/,
      'Last name must start with an uppercase letter and contain only letters',
    ),
});

const StudentValidationSchemaWithZod = z.object({
  id: z.string().nonempty('ID is required'),
  password: z.string().nonempty('Password is required'),
  name: UsernameValidationSchema,
  age: z
    .number()
    .nonnegative('Age must be a positive number')
    .int('Age must be an integer'),
  email: z
    .string()
    .email('Please provide a valid email')
    .nonempty('Email is required'),
  gender: z
    .enum(['Male', 'Female'])
    .refine(val => ['Male', 'Female'].includes(val), {
      message: 'Gender must be Male or Female',
    }),
  contactNumber: z
    .string()
    .nonempty('Contact number is required')
    .regex(
      /^\+?\d{10,11}$/,
      'Contact number must be a valid number with 10 or 11 digits, optionally starting with "+"',
    ),
  emergencyContactNumber: z
    .string()
    .nonempty('Emergency contact number is required')
    .regex(
      /^\+?\d{10,11}$/,
      'Emergency contact number must be a valid number with 10 or 11 digits, optionally starting with "+"',
    ),
  address: z.object({
    permanentAddress: z.string().nonempty('Permanent address is required'),
    currentAddress: z.string().nonempty('Current address is required'),
  }),
  dateOfBirth: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform(val => new Date(val)),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .refine(
      val => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val),
      {
        message: 'Blood group must be A+, A-, B+, B-, AB+, AB-, O+, or O-',
      },
    )
    .optional(),
  guardian: z.object({
    name: z.string().nonempty('Guardian name is required'),
    contactNumber: z
      .string()
      .nonempty('Guardian contact number is required')
      .regex(
        /^\+?\d{10,11}$/,
        'Guardian contact number must be a valid number with 10 or 11 digits, optionally starting with "+"',
      ),
    relation: z.string().nonempty('Guardian relation is required'),
  }),
  profilePicture: z.string().optional(),
  isActive: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

export default StudentValidationSchemaWithZod;
