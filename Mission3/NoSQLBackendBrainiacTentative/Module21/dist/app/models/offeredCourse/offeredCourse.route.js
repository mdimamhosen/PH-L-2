"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oOfferedCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const router = express_1.default.Router();
router.get('/', offeredCourse_controller_1.OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', offeredCourse_controller_1.OfferedCourseControllers.getOfferedCourse);
router.patch('/:id', offeredCourse_controller_1.OfferedCourseControllers.updateOfferedCourse);
router.delete('/:id', offeredCourse_controller_1.OfferedCourseControllers.deleteOfferedCourse);
router.post('/create-offered-course', (0, ValidateUserRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidations.createOfferedCourseValidationSchema), offeredCourse_controller_1.OfferedCourseControllers.createOfferedCourse);
router.get('/my-offered-courses', offeredCourse_controller_1.OfferedCourseControllers.getMyOfferedCourses);
exports.oOfferedCourseRoutes = router;
