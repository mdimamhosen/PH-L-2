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
exports.courseController = void 0;
const CatchResponse_1 = __importDefault(require("../../utils/CatchResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_service_1 = require("./course.service");
const http_status_1 = __importDefault(require("http-status"));
const createCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.createCourse(req.body);
    const data = {
        statusCode: http_status_1.default.CREATED,
        message: 'Course created successfully',
        success: true,
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const getAllCourses = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield course_service_1.CourseServices.getAllCoursesFromDB(req.query);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Courses fetched successfully',
        success: true,
        data: courses,
    };
    (0, sendResponse_1.default)(res, data);
}));
const getCourseById = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const course = yield course_service_1.CourseServices.getCourseByIdFromDB((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Course fetched successfully',
        success: true,
        data: course,
    };
    (0, sendResponse_1.default)(res, data);
}));
const updateCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const updatedCourse = yield course_service_1.CourseServices.updateCourseIntoDB((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Course updated successfully',
        success: true,
        data: updatedCourse,
    };
    (0, sendResponse_1.default)(res, data);
}));
const deleteCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const course = yield course_service_1.CourseServices.deleteCourseFromDB((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Course deleted successfully',
        success: true,
        data: course,
    };
    (0, sendResponse_1.default)(res, data);
}));
const assignFaculties = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Faculties assigned successfully',
        success: true,
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const removeFaculties = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.removeFacultiesFromCourseIntoDB(courseId, faculties);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Faculties removed successfully',
        success: true,
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const getFaculties = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const faculties = yield course_service_1.CourseServices.getFacultiesFromCourse(courseId);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Faculties fetched successfully',
        success: true,
        data: faculties,
    };
    (0, sendResponse_1.default)(res, data);
}));
exports.courseController = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    assignFaculties,
    removeFaculties,
    getFaculties,
};
