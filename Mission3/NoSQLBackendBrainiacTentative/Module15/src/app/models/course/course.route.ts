import express from 'express';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { CourseValidation } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

router.get('/:id', courseController.getCourseById);

router.patch(
  '/:id',
  DataValidation(CourseValidation.updateCourseValidation),
  courseController.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  DataValidation(CourseValidation.CourseFacultiesValidation),
  courseController.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  DataValidation(CourseValidation.CourseFacultiesValidation),
  courseController.removeFaculties,
);

router.delete('/:id', courseController.deleteCourse);

router.post(
  '/create-course',
  DataValidation(CourseValidation.createCourseValidation),
  courseController.createCourse,
);

router.get('/', courseController.getAllCourses);

export const CourseRoutes = router;
