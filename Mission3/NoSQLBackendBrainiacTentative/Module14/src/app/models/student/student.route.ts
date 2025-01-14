import express from 'express';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';
import DataValidation from '../../middlewares/ValidateUserRequest';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  DataValidation(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
