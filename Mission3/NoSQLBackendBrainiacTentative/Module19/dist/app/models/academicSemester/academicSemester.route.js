"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRouter = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const router = express_1.default.Router();
router.post('/create-academic-semester', (0, ValidateUserRequest_1.default)(academicSemester_validation_1.academicSemesterValidationSchema.academicSemesterValidation), academicSemester_controller_1.AcademicSemesterController.createAcademicSemester);
router.get('/:semesterId', academicSemester_controller_1.AcademicSemesterController.getSingleAcademicSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllAcademicSemesters);
router.patch('/:semesterId', (0, ValidateUserRequest_1.default)(academicSemester_validation_1.academicSemesterValidationSchema.updateAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterController.updateAcademicSemester);
exports.academicSemesterRouter = router;
