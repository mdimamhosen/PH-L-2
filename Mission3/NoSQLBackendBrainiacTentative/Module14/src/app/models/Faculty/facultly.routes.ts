import express from 'express';
// import DataValidation from '../../middlewares/ValidateUserRequest';
import { FacultyControllers } from './faculty.controller';
// import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

// router.patch(
//   '/:id',
//   DataValidation(FacultyValidation.updateFacultyValidationSchema),
//   FacultyControllers.updateFaculty,
// );

// router.delete('/:id', FacultyControllers.deleteFaculty);

// router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
