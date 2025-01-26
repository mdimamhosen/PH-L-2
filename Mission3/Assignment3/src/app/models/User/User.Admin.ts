import express from 'express';
import { UserValidation } from './User.validation';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { UserController } from './User.controller';

const router = express.Router();

router.post(
  '/auth/create-admin',
  ValidateUserRequest(UserValidation.UserCreateSchemaValidation),
  UserController.createAdmin,
);

export const AdminRoutes = router;
