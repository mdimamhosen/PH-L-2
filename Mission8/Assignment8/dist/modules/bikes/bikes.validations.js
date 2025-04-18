"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const addBikes = zod_1.default.object({
    body: zod_1.default.object({
        brand: zod_1.default.string().min(1, { message: 'Brand is required' }),
        model: zod_1.default.string().min(1, { message: 'Model is required' }),
        year: zod_1.default.number().min(1900, { message: 'Year must be greater than 1900' }),
        customerId: zod_1.default.string(),
    }),
});
const updatebikes = zod_1.default.object({
    body: zod_1.default.object({
        brand: zod_1.default.string().optional(),
        model: zod_1.default.string().optional(),
        year: zod_1.default.number().optional(),
    }),
});
exports.bikeValidations = {
    addBikes: addBikes,
    updateBikes: updatebikes,
};
