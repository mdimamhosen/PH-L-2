"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Blog_validation_1 = require("./Blog.validation");
const Blog_controller_1 = require("./Blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const User_const_1 = require("../User/User.const");
const router = express_1.default.Router();
router.get('/:id', Blog_controller_1.BlogController.getBlogById);
router.delete('/:id', (0, auth_1.default)(User_const_1.USER_ROLE.user), Blog_controller_1.BlogController.deleteBlog);
router.patch('/:id', (0, auth_1.default)(User_const_1.USER_ROLE.user), (0, validateRequest_1.default)(Blog_validation_1.BlogSchemaValidation.BlogUpdateSchemaValidation), Blog_controller_1.BlogController.updateBlog);
router.post('/', (0, auth_1.default)(User_const_1.USER_ROLE.user), (0, validateRequest_1.default)(Blog_validation_1.BlogSchemaValidation.BlogCreationSchemaValidation), Blog_controller_1.BlogController.createBlog);
router.get('/', Blog_controller_1.BlogController.getAllBlogs);
exports.BlogRoute = router;
