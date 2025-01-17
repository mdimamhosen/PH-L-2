import { z } from 'zod';

const SemesterRegistrationCreationValidation = z.object({
  body: z.object({
    academicSemester: z.string().nonempty(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().default(12),
    maxCredit: z.number().default(18),
  }),
});

export const SemesterRegistrationValidation = {
  SemesterRegistrationCreationValidation,
};
