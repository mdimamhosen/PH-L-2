import { z } from 'zod';

const UserSchemaValidation = z.object({
  password: z
    .string({
      invalid_type_error: 'Please provide a valid password',
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' })
    .optional(),
});

export const UserValidation = {
  UserSchemaValidation,
};
