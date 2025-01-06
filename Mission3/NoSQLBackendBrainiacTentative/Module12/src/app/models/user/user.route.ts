import express from 'express';
import { UserController } from './user.controller';
import { StudentValidation } from '../student/student.validation';
import DataValidation from '../../middlewares/ValidateUserRequest';

const router = express.Router();

router.post(
  '/create-student',
  DataValidation(StudentValidation.StudentValidationSchemaWithZod),
  UserController.createStudent,
);

export const UserRoutes = router;
