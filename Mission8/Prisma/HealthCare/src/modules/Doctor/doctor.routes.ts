import express from 'express';
import auth from '../../middlewares/auth';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { UserRole } from '@prisma/client';
import { DoctorValidation } from './doctor.validation';
import { DoctorController } from './doctor.controller';
const router = express.Router();

router.patch(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ValidateUserRequest(DoctorValidation.update),
  DoctorController.updateIntoDB,
);
export const DoctorRoutes = router;
