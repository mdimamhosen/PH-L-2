import { z } from 'zod';

const preRequisiteCourses = z.object({
  course: z.string().nonempty(),
  isDeleted: z.boolean().optional(),
});
const createCourseValidation = z.object({
  body: z.object({
    title: z.string().nonempty(),
    prefix: z.string().nonempty(),
    code: z.number().int(),
    credits: z.number().int(),
    preRequisiteCourses: z.array(preRequisiteCourses).optional(),
  }),
});

const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().nonempty().optional(),
    prefix: z.string().nonempty().optional(),
    code: z.number().int().optional(),
    credits: z.number().int().optional(),
    preRequisiteCourses: z.array(preRequisiteCourses).optional(),
  }),
});

export const CourseValidation = {
  createCourseValidation,
  updateCourseValidation,
};
