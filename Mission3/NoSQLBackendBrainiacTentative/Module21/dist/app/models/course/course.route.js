"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
// this route is for course
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), course_controller_1.courseController.getCourseById);
router.patch('/:id', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, ValidateUserRequest_1.default)(course_validation_1.CourseValidation.updateCourseValidation), course_controller_1.courseController.updateCourse);
router.put('/:courseId/assign-faculties', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, ValidateUserRequest_1.default)(course_validation_1.CourseValidation.CourseFacultiesValidation), course_controller_1.courseController.assignFaculties);
router.delete('/:courseId/remove-faculties', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, ValidateUserRequest_1.default)(course_validation_1.CourseValidation.CourseFacultiesValidation), course_controller_1.courseController.removeFaculties);
router.delete('/:id', (0, auth_1.default)(user_const_1.USER_ROLE.admin), course_controller_1.courseController.deleteCourse);
router.post('/create-course', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, ValidateUserRequest_1.default)(course_validation_1.CourseValidation.createCourseValidation), course_controller_1.courseController.createCourse);
router.get('/', (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), course_controller_1.courseController.getAllCourses);
exports.CourseRoutes = router;
