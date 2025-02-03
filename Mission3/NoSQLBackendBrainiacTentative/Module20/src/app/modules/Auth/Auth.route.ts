import express from 'express';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { AuthValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';
import { USER_ROLE } from '../user/user.const';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  DataValidation(AuthValidation.loginValidationSchema),
  AuthController.loginUer,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  DataValidation(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  DataValidation(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

router.post(
  '/forget-password',
  DataValidation(AuthValidation.forgotPasswordValidationSchema),
  AuthController.forgotPassword,
);

router.post(
  '/reset-password',
  DataValidation(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
);

export const AuthRoutes = router;
