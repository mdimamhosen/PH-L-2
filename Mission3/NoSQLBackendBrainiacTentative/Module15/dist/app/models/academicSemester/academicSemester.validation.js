'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicSemesterValidationSchema = void 0;
const zod_1 = require('zod');
const academicSemester_const_1 = require('./academicSemester.const');
const academicSemesterValidation = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.enum([...academicSemester_const_1.academicSemesterNames]),
    code: zod_1.z.enum([...academicSemester_const_1.academicSemesterCodes]),
    year: zod_1.z.string(),
    startMonth: zod_1.z.enum([...academicSemester_const_1.academicMonths]),
    endMonth: zod_1.z.enum([...academicSemester_const_1.academicMonths]),
  }),
});
const updateAcademicSemesterValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z
      .enum([...academicSemester_const_1.academicSemesterNames])
      .optional(),
    year: zod_1.z.string().optional(),
    code: zod_1.z
      .enum([...academicSemester_const_1.academicSemesterCodes])
      .optional(),
    startMonth: zod_1.z
      .enum([...academicSemester_const_1.academicMonths])
      .optional(),
    endMonth: zod_1.z
      .enum([...academicSemester_const_1.academicMonths])
      .optional(),
  }),
});
exports.academicSemesterValidationSchema = {
  academicSemesterValidation,
  updateAcademicSemesterValidationSchema,
};
