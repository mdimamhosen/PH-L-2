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
exports.genarateBlogId = void 0;
const Blog_model_1 = __importDefault(require("./Blog.model"));
const genarateBlogId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentBlogId = (0).toString().padStart(4, '0');
    const lastBlogId = yield findLastBlogId();
    if (lastBlogId) {
        const lastIdNumber = parseInt(lastBlogId, 10);
        const newIdNumber = lastIdNumber + 1;
        currentBlogId = newIdNumber.toString().padStart(4, '0');
    }
    else {
        currentBlogId = (Number(currentBlogId) + 1).toString().padStart(4, '0');
    }
    const blogId = `B-${currentBlogId}`;
    return blogId;
});
exports.genarateBlogId = genarateBlogId;
const findLastBlogId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastBlog = yield Blog_model_1.default.findOne({}, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    console.log(yield Blog_model_1.default.findOne({}, { id: 1, _id: 0 }));
    return (lastBlog === null || lastBlog === void 0 ? void 0 : lastBlog.id) ? lastBlog.id.substring(2) : undefined;
});
