import express from 'express';
import { studentRouter } from '../models/student/student.route';
import { UserRoutes } from '../models/user/user.route';
import { academicSemesterRouter } from '../models/academicSemester/academicSemester.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/student',
    module: studentRouter,
  },
  {
    path: '/users',
    module: UserRoutes,
  },
  {
    path: '/academic-semesters',
    module: academicSemesterRouter,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});

export const routes = router;
