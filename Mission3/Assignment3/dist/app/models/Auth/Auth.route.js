"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const User_validation_1 = require("../User/User.validation");
const User_controller_1 = require("../User/User.controller");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.loginValidationSchema), Auth_controller_1.AuthController.loginUser);
router.post('/register', (0, validateRequest_1.default)(User_validation_1.UserValidation.UserCreateSchemaValidation), User_controller_1.UserController.createUser);
exports.AuthRoutes = router;
