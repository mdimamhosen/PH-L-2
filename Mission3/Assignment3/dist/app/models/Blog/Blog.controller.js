"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const catchAsyncResponse_1 = __importDefault(require("../../utils/catchAsyncResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Blog_service_1 = require("./Blog.service");
const createBlog = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log('userID', user?._id);
    const result = yield Blog_service_1.BlogService.CreateBlog(user === null || user === void 0 ? void 0 : user._id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        data: result,
        message: 'Blog created successfully',
        statusCode: 201,
    });
}));
const getAllBlogs = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog_service_1.BlogService.GetAllBlogs(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        data: result,
        message: 'All blogs fetched successfully',
        statusCode: 200,
    });
}));
const getBlogById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req.params.blogId', req.params.id);
    const result = yield Blog_service_1.BlogService.GetBlogById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        data: result,
        message: 'Blog fetched successfully',
        statusCode: 200,
    });
}));
const deleteBlog = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog_service_1.BlogService.deleteBlog(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        data: result,
        message: 'Blog deleted successfully',
        statusCode: 200,
    });
}));
const deleteBlogByAdmin = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Blog_service_1.BlogService.deleteBlog(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 200,
    });
}));
const updateBlog = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog_service_1.BlogService.updateBlog(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        data: result,
        message: 'Blog updated successfully',
        statusCode: 200,
    });
}));
exports.BlogController = {
    createBlog,
    getAllBlogs,
    deleteBlog,
    getBlogById,
    updateBlog,
    deleteBlogByAdmin,
};
