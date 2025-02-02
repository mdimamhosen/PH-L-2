'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../models/user/user.route');
const academicSemester_route_1 = require('../models/academicSemester/academicSemester.route');
const academicFaculty_route_1 = require('../models/academicFaculty/academicFaculty.route');
const academicDepartment_route_1 = require('../models/academicDepartment/academicDepartment.route');
const student_route_1 = require('../models/student/student.route');
const facultly_routes_1 = require('../models/faculty/facultly.routes');
const admin_route_1 = require('../models/admin/admin.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/student',
    module: student_route_1.StudentRoutes,
  },
  {
    path: '/users',
    module: user_route_1.UserRoutes,
  },
  {
    path: '/academic-semesters',
    module: academicSemester_route_1.academicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    module: academicFaculty_route_1.AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    module: academicDepartment_route_1.AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    module: facultly_routes_1.FacultyRoutes,
  },
  {
    path: '/admins',
    module: admin_route_1.AdminRoutes,
  },
];
moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});
exports.routes = router;
