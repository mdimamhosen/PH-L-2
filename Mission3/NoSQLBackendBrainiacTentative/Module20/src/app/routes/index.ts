import express from 'express';
import { UserRoutes } from '../models/user/user.route';
import { academicSemesterRouter } from '../models/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../models/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../models/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../models/student/student.route';
import { FacultyRoutes } from '../models/faculty/facultly.routes';
import { AdminRoutes } from '../models/admin/admin.route';
import { CourseRoutes } from '../models/course/course.route';
import { SemesterRegistrationRoutes } from '../models/semisterRegistration/semReg.route';
import { oOfferedCourseRoutes } from '../models/offeredCourse/offeredCourse.route';
import { AuthRoutes } from '../models/Auth/Auth.route';
import { EnrolledCourseRoute } from '../models/EnrolledCourse/EnrolledCourse.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/student',
    module: StudentRoutes,
  },
  {
    path: '/users',
    module: UserRoutes,
  },
  {
    path: '/academic-semesters',
    module: academicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    module: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    module: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    module: FacultyRoutes,
  },
  {
    path: '/admins',
    module: AdminRoutes,
  },
  {
    path: '/courses',
    module: CourseRoutes,
  },
  {
    path: '/semseter-registrations',
    module: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    module: oOfferedCourseRoutes,
  },
  {
    path: '/auth',
    module: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    module: EnrolledCourseRoute,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});

export const routes = router;
