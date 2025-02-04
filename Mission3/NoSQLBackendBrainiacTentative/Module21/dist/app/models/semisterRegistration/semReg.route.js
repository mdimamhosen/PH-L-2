"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const semReg_controller_1 = require("./semReg.controller");
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const semReg_validation_1 = require("./semReg.validation");
const router = express_1.default.Router();
router.get('/', semReg_controller_1.SemesterRegistrationController.getAllRegisteredSemester);
router.get('/:id', semReg_controller_1.SemesterRegistrationController.getSingleRegisteredSemester);
router.put('/:id', (0, ValidateUserRequest_1.default)(semReg_validation_1.SemesterRegistrationValidation.SemesterRegistrationUpdateValidation), semReg_controller_1.SemesterRegistrationController.updateRegisteredSemistered);
router.post('/create-semester-registration', (0, ValidateUserRequest_1.default)(semReg_validation_1.SemesterRegistrationValidation.SemesterRegistrationCreationValidation), semReg_controller_1.SemesterRegistrationController.createSemesterRegistration);
exports.SemesterRegistrationRoutes = router;
