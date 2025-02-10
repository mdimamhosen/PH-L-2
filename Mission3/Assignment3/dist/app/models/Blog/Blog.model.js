"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Id is required'],
        unique: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: 255,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
BlogSchema.statics.findNonDeleted = function () {
    return this.find({ isDeleted: false });
};
const Blog = (0, mongoose_1.model)('Blog', BlogSchema);
exports.default = Blog;
