import { z } from 'zod';

enum Status {
  pending = 'pending',
  in_progress = 'in_progress',
  done = 'done',
}

const addServiceValidationSchema = z.object({
  body: z.object({
    bikeId: z.string().min(1, { message: 'Bike ID is required' }),
    serviceDate: z.string().optional(),
    description: z.string(),
    status: z
      .enum([Status.pending, Status.in_progress, Status.done])
      .optional(),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    completionDate: z.string().optional(),
  }),
});

export const bikeServiceValidations = {
  addServiceValidationSchema: addServiceValidationSchema,
  updateServiceValidationSchema: updateServiceValidationSchema,
};
