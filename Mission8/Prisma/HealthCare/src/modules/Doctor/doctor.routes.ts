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
// task 3
router.get('/', DoctorController.getAllFromDB);

//task 4
router.get('/:id', DoctorController.getByIdFromDB);
router.patch(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ValidateUserRequest(DoctorValidation.update),
  DoctorController.updateIntoDB,
);

//task 5
router.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorController.deleteFromDB,
);

// task 6
router.delete(
  '/soft/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorController.softDelete,
);

export const DoctorRoutes = router;
