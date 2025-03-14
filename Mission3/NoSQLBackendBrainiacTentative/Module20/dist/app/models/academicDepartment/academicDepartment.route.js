"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post('/create-academic-department', (0, ValidateUserRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.createAcademicDepartmemt);
router.get('/', academicDepartment_controller_1.AcademicDepartmentControllers.getAllAcademicDepartments);
router.get('/:departmentId', academicDepartment_controller_1.AcademicDepartmentControllers.getSingleAcademicDepartment);
router.put('/:departmentId', (0, ValidateUserRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.updateAcademicDeartment);
exports.AcademicDepartmentRoutes = router;
