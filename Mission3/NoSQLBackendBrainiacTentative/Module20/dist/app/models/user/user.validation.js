"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_const_1 = require("./user.const");
const UserSchemaValidation = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Please provide a valid password',
    })
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: 'Password must be at most 20 characters long' })
        .optional(),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...user_const_1.UserStatus]),
    }),
});
exports.UserValidation = {
    UserSchemaValidation,
    changeStatusValidationSchema,
};
