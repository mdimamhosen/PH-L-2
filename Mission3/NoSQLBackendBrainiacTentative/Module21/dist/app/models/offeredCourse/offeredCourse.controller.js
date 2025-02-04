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
exports.OfferedCourseControllers = void 0;
const CatchResponse_1 = __importDefault(require("../../utils/CatchResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const offeredCourse_service_1 = require("./offeredCourse.service");
const http_status_1 = __importDefault(require("http-status"));
const createOfferedCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
}));
const getAllOfferedCourses = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.getAllOfferedCoursesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offered Courses are fetched successfully !',
        data: result,
    });
}));
const getOfferedCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.getSingleOfferedCourseFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offered Course is fetched successfully !',
        data: result,
    });
}));
const updateOfferedCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.updateOfferedCourseIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offered Course is updated successfully !',
        data: result,
    });
}));
const deleteOfferedCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.deleteOfferedCourseFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offered Course is deleted successfully !',
        data: result,
    });
}));
const getMyOfferedCourses = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const courses = yield offeredCourse_service_1.OfferedCourseServices.getMyOfferedCoursesFromDB(id);
    const data = {
        statusCode: http_status_1.default.OK,
        message: 'Courses fetched successfully',
        success: true,
        data: courses,
    };
    (0, sendResponse_1.default)(res, data);
}));
exports.OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getOfferedCourse,
    updateOfferedCourse,
    deleteOfferedCourse,
    getMyOfferedCourses,
};
