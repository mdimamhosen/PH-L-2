"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const student_validation_1 = require("../student/student.validation");
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("./user.const");
const user_validation_1 = require("./user.validation");
const sendEmailToCloudinary_1 = require("../../utils/sendEmailToCloudinary");
const router = express_1.default.Router();
router.post('/create-student', (0, auth_1.default)(user_const_1.USER_ROLE.admin), sendEmailToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, ValidateUserRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controller_1.UserController.createStudent);
router.post('/create-faculty', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, ValidateUserRequest_1.default)(faculty_validation_1.FacultyValidation.createFacultyValidationSchema), user_controller_1.UserController.createFaculty);
router.post('/create-admin', (0, ValidateUserRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.UserController.createAdmin);
router.get('/me', (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), user_controller_1.UserController.getMe);
router.post('/change-status/:id', (0, auth_1.default)('admin'), (0, ValidateUserRequest_1.default)(user_validation_1.UserValidation.changeStatusValidationSchema), user_controller_1.UserController.changeStatus);
exports.UserRoutes = router;
