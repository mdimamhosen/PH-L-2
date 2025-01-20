import express from 'express';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { AuthValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';

const router = express.Router();

router.post(
  '/login',
  DataValidation(AuthValidation.loginValidationSchema),
  AuthController.loginUer,
);

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

export const AuthRoutes = router;
