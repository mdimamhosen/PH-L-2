"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchemaValidation = void 0;
const zod_1 = require("zod");
const BlogCreationSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, 'Title must be at least 3 characters').max(255),
        content: zod_1.z.string().min(10, 'Content must be at least 10 characters'),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
const BlogUpdateSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(3, 'Title must be at least 3 characters')
            .max(255)
            .optional(),
        content: zod_1.z
            .string()
            .min(10, 'Content must be at least 10 characters')
            .optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
exports.BlogSchemaValidation = {
    BlogCreationSchemaValidation,
    BlogUpdateSchemaValidation,
};
