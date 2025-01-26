import express from 'express';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';

const router = express.Router();

router.post(
  '/login',
  ValidateUserRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
