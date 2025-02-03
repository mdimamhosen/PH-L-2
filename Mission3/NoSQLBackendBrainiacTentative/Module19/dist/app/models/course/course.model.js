"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseFaculty = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCourseSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: Number,
        required: true,
        trim: true,
    },
    credits: {
        type: Number,
        required: true,
        trim: true,
    },
    preRequisiteCourses: {
        type: [preRequisiteCourseSchema],
        default: [],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseFacultySchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    faculties: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
});
exports.CourseFaculty = (0, mongoose_1.model)('CourseFaculty', courseFacultySchema);
const Course = (0, mongoose_1.model)('Course', courseSchema);
exports.default = Course;
