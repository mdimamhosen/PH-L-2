import express from 'express';
import { UserValidation } from './User.validation';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { UserController } from './User.controller';
import { BlogController } from '../Blog/Blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './User.constant';

const router = express.Router();

router.post(
  '/auth/create-admin',
  ValidateUserRequest(UserValidation.UserCreateSchemaValidation),
  UserController.createAdmin,
);

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  UserController.blockUser,
);

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  BlogController.deleteBlogByAdmin,
);

export const AdminRoutes = router;
