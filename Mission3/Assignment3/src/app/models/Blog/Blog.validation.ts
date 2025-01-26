import { z } from 'zod';

const BlogCreationSchemaValidation = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(255),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    author: z.string(),
    isPublished: z.boolean().optional(),
  }),
});

const BlogUpdateSchemaValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(255)
      .optional(),
    content: z
      .string()
      .min(10, 'Content must be at least 10 characters')
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogSchemaValidation = {
  BlogCreationSchemaValidation,
  BlogUpdateSchemaValidation,
};
