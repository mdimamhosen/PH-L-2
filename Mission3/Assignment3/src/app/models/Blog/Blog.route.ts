import express from 'express';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { BlogSchemaValidation } from './Blog.validation';
import { BlogController } from './Blog.controller';

const router = express.Router();

router.post(
  '/',
  ValidateUserRequest(BlogSchemaValidation.BlogCreationSchemaValidation),
  BlogController.createBlog,
);

router.get('/', BlogController.getAllBlogs);

export const BlogRoute = router;
