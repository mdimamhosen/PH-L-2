"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'ID is required',
            message: 'ID is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
            message: 'Password is required',
        }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required',
            message: 'Old password is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New Password is required',
            message: 'New Password is required',
        }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required',
            message: 'Refresh token is required',
        }),
    }),
});
const forgotPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'ID is required',
            message: 'ID is required',
        }),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'ID is required',
            message: 'ID is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New Password is required',
            message: 'New Password is required',
        }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgotPasswordValidationSchema,
    resetPasswordValidationSchema,
};
