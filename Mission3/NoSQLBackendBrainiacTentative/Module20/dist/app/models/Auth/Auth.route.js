"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidateUserRequest_1 = __importDefault(require("../../middlewares/ValidateUserRequest"));
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const user_const_1 = require("../user/user.const");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/login', (0, ValidateUserRequest_1.default)(Auth_validation_1.AuthValidation.loginValidationSchema), Auth_controller_1.AuthController.loginUer);
router.post('/change-password', (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), (0, ValidateUserRequest_1.default)(Auth_validation_1.AuthValidation.changePasswordValidationSchema), Auth_controller_1.AuthController.changePassword);
router.post('/refresh-token', (0, ValidateUserRequest_1.default)(Auth_validation_1.AuthValidation.refreshTokenValidationSchema), Auth_controller_1.AuthController.refreshToken);
router.post('/forget-password', (0, ValidateUserRequest_1.default)(Auth_validation_1.AuthValidation.forgotPasswordValidationSchema), Auth_controller_1.AuthController.forgotPassword);
router.post('/reset-password', (0, ValidateUserRequest_1.default)(Auth_validation_1.AuthValidation.resetPasswordValidationSchema), Auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
