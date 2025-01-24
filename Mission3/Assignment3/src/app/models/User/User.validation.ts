import { z } from 'zod';

const UserCreateSchemaValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name cannot be less than 3 characters' })
      .max(255, { message: 'Name cannot exceed 255 characters' }),

    email: z.string().email('Invalid email address'),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(255, { message: 'Password cannot exceed 255 characters' }),

    role: z
      .enum(['admin', 'user'], {
        message: 'Role must be either "admin" or "user"',
      })
      .default('user'),
    isBlocked: z.boolean().optional().default(false),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const UserValidation = {
  UserCreateSchemaValidation,
};
