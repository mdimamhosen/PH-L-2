import express from 'express';
import { UserController } from './user.controller';

import DataValidation from '../../middlewares/ValidateUserRequest';
import { studentValidations } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  DataValidation(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
