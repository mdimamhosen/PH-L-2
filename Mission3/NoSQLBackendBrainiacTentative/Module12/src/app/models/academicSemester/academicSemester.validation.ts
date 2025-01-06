import { z } from 'zod';
import {
  academicMonths,
  academicSemesterCodes,
  academicSemesterNames,
} from './academicSemester.const';

const academicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNames] as [string, ...string[]]),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...academicMonths] as [string, ...string[]]),
    endMonth: z.enum([...academicMonths] as [string, ...string[]]),
  }),
});

export const academicSemesterValidationSchema = { academicSemesterValidation };
