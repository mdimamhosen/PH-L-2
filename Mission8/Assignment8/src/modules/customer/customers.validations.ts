import z from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const createCustomer = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .nonempty()
      .regex(emailRegex, { message: 'Invalid email address' }),
    phone: z.string(),
  }),
});

const updateCustomer = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const customerValidation = {
  createCustomer: createCustomer,
  updateCustomer: updateCustomer,
};
