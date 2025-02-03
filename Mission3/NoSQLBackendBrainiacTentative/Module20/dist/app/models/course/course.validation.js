"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const zod_1 = require("zod");
const preRequisiteCourses = zod_1.z.object({
    course: zod_1.z.string().nonempty(),
    isDeleted: zod_1.z.boolean().optional(),
});
const createCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty(),
        prefix: zod_1.z.string().nonempty(),
        code: zod_1.z.number().int(),
        credits: zod_1.z.number().int(),
        preRequisiteCourses: zod_1.z.array(preRequisiteCourses).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty().optional(),
        prefix: zod_1.z.string().nonempty().optional(),
        code: zod_1.z.number().int().optional(),
        credits: zod_1.z.number().int().optional(),
        preRequisiteCourses: zod_1.z.array(preRequisiteCourses).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const CourseFacultiesValidation = zod_1.z.object({
    body: zod_1.z.object({
        faculties: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.CourseValidation = {
    createCourseValidation,
    updateCourseValidation,
    CourseFacultiesValidation,
};
