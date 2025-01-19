import express from 'express';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = express.Router();
router.get('/', OfferedCourseControllers.getAllOfferedCourses);

router.get('/:id', OfferedCourseControllers.getOfferedCourse);

router.patch('/:id', OfferedCourseControllers.updateOfferedCourse);

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);
router.post(
  '/create-offered-course',
  DataValidation(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

export const oOfferedCourseRoutes = router;
