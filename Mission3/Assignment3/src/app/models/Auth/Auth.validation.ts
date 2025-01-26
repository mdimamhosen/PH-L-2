import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
      message: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
      message: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
