import express from 'express';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';
import { UserValidation } from '../User/User.validation';
import { UserController } from '../User/User.controller';

const router = express.Router();

router.post(
  '/login',
  ValidateUserRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

router.post(
  '/register',
  ValidateUserRequest(UserValidation.UserCreateSchemaValidation),
  UserController.createUser,
);

export const AuthRoutes = router;
