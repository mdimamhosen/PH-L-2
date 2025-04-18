"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const createCustomer = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().min(1, { message: 'Name is required' }),
        email: zod_1.default
            .string()
            .nonempty()
            .regex(emailRegex, { message: 'Invalid email address' }),
        phone: zod_1.default.string(),
    }),
});
const updateCustomer = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        phone: zod_1.default.string().optional(),
    }),
});
exports.customerValidation = {
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,
};
