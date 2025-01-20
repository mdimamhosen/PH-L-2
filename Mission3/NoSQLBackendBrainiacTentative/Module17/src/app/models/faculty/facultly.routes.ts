import express from 'express';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { FacultyControllers } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  DataValidation(FacultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
