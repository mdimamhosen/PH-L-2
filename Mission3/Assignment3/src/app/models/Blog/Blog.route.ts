import express from 'express';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { BlogSchemaValidation } from './Blog.validation';
import { BlogController } from './Blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.const';

const router = express.Router();

router.get('/:id', BlogController.getBlogById);

router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  ValidateUserRequest(BlogSchemaValidation.BlogUpdateSchemaValidation),
  BlogController.updateBlog,
);

router.post(
  '/',
  auth(USER_ROLE.user),
  ValidateUserRequest(BlogSchemaValidation.BlogCreationSchemaValidation),
  BlogController.createBlog,
);

router.get('/', BlogController.getAllBlogs);

export const BlogRoute = router;
