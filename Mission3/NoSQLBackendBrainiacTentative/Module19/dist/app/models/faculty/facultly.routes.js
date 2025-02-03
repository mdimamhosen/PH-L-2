"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const faculty_controller_1 = require("./faculty.controller");
const faculty_validation_1 = require("./faculty.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
const router = express_1.default.Router();
router.get('/:id', faculty_controller_1.FacultyControllers.getSingleFaculty);
router.patch('/:id', (0, ValidateUserRequest_1.default)(faculty_validation_1.FacultyValidation.updateFacultyValidationSchema), faculty_controller_1.FacultyControllers.updateFaculty);
router.delete('/:id', faculty_controller_1.FacultyControllers.deleteFaculty);
router.get('/', (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty), faculty_controller_1.FacultyControllers.getAllFaculties);
exports.FacultyRoutes = router;
