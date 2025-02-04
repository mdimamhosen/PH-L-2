import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { EnrolledCourseValidation } from './EnrolledCourse.validation';
import { EnrolledCourseController } from './EnrolledCourse.controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  DataValidation(EnrolledCourseValidation.createEnrolledCourseValidationSchema),
  EnrolledCourseController.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  DataValidation(
    EnrolledCourseValidation.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseController.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoute = router;
