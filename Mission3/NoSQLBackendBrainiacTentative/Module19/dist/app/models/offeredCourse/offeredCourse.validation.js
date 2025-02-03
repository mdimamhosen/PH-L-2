"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidations = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine(time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
const createOfferedCourseBodySchema = zod_1.z.object({
    semesterRegistration: zod_1.z.string(),
    academicFaculty: zod_1.z.string(),
    academicDepartment: zod_1.z.string(),
    course: zod_1.z.string(),
    faculty: zod_1.z.string(),
    section: zod_1.z.number(),
    maxCapacity: zod_1.z.number(),
    days: zod_1.z.array(zod_1.z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
    startTime: timeStringSchema, // HH: MM   00-23: 00-59
    endTime: timeStringSchema,
});
const createOfferedCourseValidationSchema = zod_1.z.object({
    body: createOfferedCourseBodySchema.refine(data => {
        const startTime = new Date(`2021-01-01T${data.startTime}`);
        const endTime = new Date(`2021-01-01T${data.endTime}`);
        return startTime < endTime;
    }, {
        message: 'startTime should be less than endTime',
    }),
});
const updateOfferedCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.string().optional(),
        maxCapacity: zod_1.z.number().optional(),
        days: zod_1.z
            .array(zod_1.z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']))
            .optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
    }),
});
const updateOfferedCourseValidationSchema = zod_1.z.object({
    body: updateOfferedCourseSchema.refine(data => {
        const startTime = new Date(`2021-01-01T${data.body.startTime}`);
        const endTime = new Date(`2021-01-01T${data.body.endTime}`);
        return startTime < endTime;
    }, {
        message: 'startTime should be less than endTime',
    }),
});
exports.OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
};
