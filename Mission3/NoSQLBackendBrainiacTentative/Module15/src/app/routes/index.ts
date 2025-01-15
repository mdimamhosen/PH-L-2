import express from 'express';
import { UserRoutes } from '../models/user/user.route';
import { academicSemesterRouter } from '../models/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../models/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../models/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../models/student/student.route';
import { FacultyRoutes } from '../models/Faculty/facultly.routes';
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
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});

export const routes = router;
