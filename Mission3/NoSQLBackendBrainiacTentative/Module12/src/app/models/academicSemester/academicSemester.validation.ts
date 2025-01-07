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
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...academicSemesterNames] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    code: z
      .enum([...academicSemesterCodes] as [string, ...string[]])
      .optional(),
    startMonth: z.enum([...academicMonths] as [string, ...string[]]).optional(),
    endMonth: z.enum([...academicMonths] as [string, ...string[]]).optional(),
  }),
});
export const academicSemesterValidationSchema = {
  academicSemesterValidation,
  updateAcademicSemesterValidationSchema,
};
