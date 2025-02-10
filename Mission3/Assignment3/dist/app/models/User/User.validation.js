"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const UserCreateSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, { message: 'Name cannot be less than 3 characters' })
            .max(255, { message: 'Name cannot exceed 255 characters' }),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(255, { message: 'Password cannot exceed 255 characters' }),
        role: zod_1.z
            .enum(['admin', 'user'], {
            message: 'Role must be either "admin" or "user"',
        })
            .default('user'),
        isBlocked: zod_1.z.boolean().optional().default(false),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
exports.UserValidation = {
    UserCreateSchemaValidation,
};
