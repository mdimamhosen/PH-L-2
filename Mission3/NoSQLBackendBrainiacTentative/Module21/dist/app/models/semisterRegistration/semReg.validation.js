"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const isValidObjectId = (value) => mongoose_1.Types.ObjectId.isValid(value);
const SemesterRegistrationCreationValidation = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z
            .string()
            .refine(isValidObjectId, { message: 'Invalid academicSemester ID' }),
        status: zod_1.z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
        startDate: zod_1.z.string().datetime(),
        endDate: zod_1.z.string().datetime(),
        minCredit: zod_1.z.number().default(12),
        maxCredit: zod_1.z.number().default(18),
    }),
});
const SemesterRegistrationUpdateValidation = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z
            .string()
            .refine(isValidObjectId, { message: 'Invalid academicSemester ID' })
            .optional(),
        status: zod_1.z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        minCredit: zod_1.z.number().default(12).optional(),
        maxCredit: zod_1.z.number().default(18).optional(),
    }),
});
exports.SemesterRegistrationValidation = {
    SemesterRegistrationCreationValidation,
    SemesterRegistrationUpdateValidation,
};
