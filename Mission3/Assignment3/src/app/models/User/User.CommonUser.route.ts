import express from 'express';
import { UserValidation } from './User.validation';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { UserController } from './User.controller';

const router = express.Router();

router.post(
  '/register',
  ValidateUserRequest(UserValidation.UserCreateSchemaValidation),
  UserController.createUser,
);

export const UserRoutes = router;
