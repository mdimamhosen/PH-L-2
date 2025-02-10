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
exports.BlogService = void 0;
const AppError_1 = require("../../utils/AppError");
const User_model_1 = require("../User/User.model");
const http_status_1 = __importDefault(require("http-status"));
const Blog_model_1 = __importDefault(require("./Blog.model"));
const Blog_utils_1 = require("./Blog.utils");
const QueryBuiler_1 = __importDefault(require("../../builder/QueryBuiler"));
const Blog_constant_1 = require("./Blog.constant");
const mongoose_1 = __importDefault(require("mongoose"));
const CreateBlog = (userID, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // is the author a valid user?
    const isAuthorValid = yield User_model_1.User.findById(userID);
    if (!isAuthorValid) {
        throw new AppError_1.AppError('Author is not valid', http_status_1.default.NOT_FOUND);
    }
    const blogId = yield (0, Blog_utils_1.genarateBlogId)();
    payload.id = blogId;
    payload.author = new mongoose_1.default.Types.ObjectId(userID);
    const newBlog = (yield Blog_model_1.default.create(payload)).populate('author');
    return newBlog;
});
const GetAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogsQuery = new QueryBuiler_1.default(Blog_model_1.default.find().populate('author'), query)
        .search(Blog_constant_1.BlogSearchAbleFields)
        .sortBy()
        .sortOrder()
        .filter()
        .fields();
    const allBlogs = yield blogsQuery.QueryModel;
    return allBlogs;
});
const GetBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield Blog_model_1.default.findById(id).populate('author');
    if (!blog) {
        throw new AppError_1.AppError('Blog not found', http_status_1.default.NOT_FOUND);
    }
    return blog;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield Blog_model_1.default.findById(id);
    if (!isBlogExist) {
        throw new AppError_1.AppError('Blog not found', http_status_1.default.NOT_FOUND);
    }
    const result = yield Blog_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield Blog_model_1.default.findById(id);
    if (!isBlogExist) {
        throw new AppError_1.AppError('Blog not found', http_status_1.default.NOT_FOUND);
    }
    const updatedBlog = yield Blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate('author');
    if (!updatedBlog) {
        throw new AppError_1.AppError("Blog can't be updated", http_status_1.default.INTERNAL_SERVER_ERROR);
    }
    return updatedBlog;
});
exports.BlogService = {
    CreateBlog,
    GetBlogById,
    GetAllBlogs,
    deleteBlog,
    updateBlog,
};
