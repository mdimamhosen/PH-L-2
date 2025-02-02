import express from 'express';
import { UserController } from './user.controller';

import DataValidation from '../../middlewares/ValidateUserRequest';
import { studentValidations } from '../student/student.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  DataValidation(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  DataValidation(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  DataValidation(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
export const UserRoutes = router;
