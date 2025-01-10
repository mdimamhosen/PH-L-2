import express from 'express';

import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';
import DataValidation from '../../middlewares/ValidateUserRequest';

const router = express.Router();

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  DataValidation(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
