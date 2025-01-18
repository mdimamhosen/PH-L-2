import { z } from 'zod';
import { Types } from 'mongoose';

const isValidObjectId = (value: string) => Types.ObjectId.isValid(value);

const SemesterRegistrationCreationValidation = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .refine(isValidObjectId, { message: 'Invalid academicSemester ID' }),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().default(12),
    maxCredit: z.number().default(18),
  }),
});

const SemesterRegistrationUpdateValidation = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .refine(isValidObjectId, { message: 'Invalid academicSemester ID' })
      .optional(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().default(12).optional(),
    maxCredit: z.number().default(18).optional(),
  }),
});

export const SemesterRegistrationValidation = {
  SemesterRegistrationCreationValidation,
  SemesterRegistrationUpdateValidation,
};
