import express from 'express';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { CourseValidation } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
// this route is for course
const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  courseController.getCourseById,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  DataValidation(CourseValidation.updateCourseValidation),
  courseController.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin),
  DataValidation(CourseValidation.CourseFacultiesValidation),
  courseController.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin),
  DataValidation(CourseValidation.CourseFacultiesValidation),
  courseController.removeFaculties,
);

router.delete('/:id', auth(USER_ROLE.admin), courseController.deleteCourse);

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  DataValidation(CourseValidation.createCourseValidation),
  courseController.createCourse,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  courseController.getAllCourses,
);

export const CourseRoutes = router;
