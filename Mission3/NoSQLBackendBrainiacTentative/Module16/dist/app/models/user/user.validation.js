'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const UserSchemaValidation = zod_1.z.object({
  password: zod_1.z
    .string({
      invalid_type_error: 'Please provide a valid password',
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' })
    .optional(),
});
exports.UserValidation = {
  UserSchemaValidation,
};
