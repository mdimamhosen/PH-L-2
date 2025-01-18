import { z } from 'zod';

const timeStringSchema = z.string().refine(
  time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const createOfferedCourseBodySchema = z.object({
  semesterRegistration: z.string(),
  academicFaculty: z.string(),
  academicDepartment: z.string(),
  course: z.string(),
  faculty: z.string(),
  section: z.number(),
  maxCapacity: z.number(),
  days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
  startTime: timeStringSchema, // HH: MM   00-23: 00-59
  endTime: timeStringSchema,
});

const createOfferedCourseValidationSchema = z.object({
  body: createOfferedCourseBodySchema.refine(
    data => {
      const startTime = new Date(`2021-01-01T${data.startTime}`);
      const endTime = new Date(`2021-01-01T${data.endTime}`);
      return startTime < endTime;
    },
    {
      message: 'startTime should be less than endTime',
    },
  ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    startTime: timeStringSchema.optional(),
    endTime: timeStringSchema.optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
