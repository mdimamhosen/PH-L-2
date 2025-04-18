import z from 'zod';

const addBikes = z.object({
  body: z.object({
    brand: z.string().min(1, { message: 'Brand is required' }),
    model: z.string().min(1, { message: 'Model is required' }),
    year: z.number().min(1900, { message: 'Year must be greater than 1900' }),
    customerId: z.string(),
  }),
});

const updatebikes = z.object({
  body: z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.number().optional(),
  }),
});

export const bikeValidations = {
  addBikes: addBikes,
  updateBikes: updatebikes,
};
