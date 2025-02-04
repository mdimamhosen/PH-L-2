"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const EnrolledCourse_validation_1 = require("./EnrolledCourse.validation");
const EnrolledCourse_controller_1 = require("./EnrolledCourse.controller");
const router = express_1.default.Router();
router.post('/create-enrolled-course', (0, auth_1.default)(user_const_1.USER_ROLE.student), (0, ValidateUserRequest_1.default)(EnrolledCourse_validation_1.EnrolledCourseValidation.createEnrolledCourseValidationSchema), EnrolledCourse_controller_1.EnrolledCourseController.createEnrolledCourse);
router.patch('/update-enrolled-course-marks', (0, auth_1.default)('faculty'), (0, ValidateUserRequest_1.default)(EnrolledCourse_validation_1.EnrolledCourseValidation.updateEnrolledCourseMarksValidationZodSchema), EnrolledCourse_controller_1.EnrolledCourseController.updateEnrolledCourseMarks);
exports.EnrolledCourseRoute = router;
