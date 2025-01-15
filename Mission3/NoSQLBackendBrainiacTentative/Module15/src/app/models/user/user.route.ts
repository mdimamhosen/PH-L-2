import express from 'express';
import { UserController } from './user.controller';

import DataValidation from '../../middlewares/ValidateUserRequest';
import { studentValidations } from '../student/student.validation';
import { FacultyValidation } from '../Faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  DataValidation(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  DataValidation(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);
export const UserRoutes = router;
