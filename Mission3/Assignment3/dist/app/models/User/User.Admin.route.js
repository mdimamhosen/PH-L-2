"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const User_validation_1 = require("./User.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const User_controller_1 = require("./User.controller");
const Blog_controller_1 = require("../Blog/Blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const User_constant_1 = require("./User.constant");
const router = express_1.default.Router();
router.post('/auth/create-admin', (0, validateRequest_1.default)(User_validation_1.UserValidation.UserCreateSchemaValidation), User_controller_1.UserController.createAdmin);
router.patch('/users/:userId/block', (0, auth_1.default)(User_constant_1.USER_ROLE.admin), User_controller_1.UserController.blockUser);
router.delete('/blogs/:id', (0, auth_1.default)(User_constant_1.USER_ROLE.admin), Blog_controller_1.BlogController.deleteBlogByAdmin);
exports.AdminRoutes = router;
