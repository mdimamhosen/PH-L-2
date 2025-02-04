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
exports.EnrolledCourseController = void 0;
const CatchResponse_1 = __importDefault(require("../../utils/CatchResponse"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const EnrolledCourse_service_1 = require("./EnrolledCourse.service");
const createEnrolledCourse = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield EnrolledCourse_service_1.EnrolledCourseService.createEnrolledCourse(id, req.body);
    const data = {
        success: true,
        data: result,
        message: 'EnrolledCourse created successfully',
        statusCode: http_status_1.default.CREATED,
    };
    (0, sendResponse_1.default)(res, data);
}));
const updateEnrolledCourseMarks = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyID = req.user.id;
    const result = yield EnrolledCourse_service_1.EnrolledCourseService.updateEnrolledCourseMarks(facultyID, req.body);
    const data = {
        success: true,
        data: result,
        message: 'EnrolledCourse marks updated successfully',
        statusCode: http_status_1.default.OK,
    };
    (0, sendResponse_1.default)(res, data);
}));
exports.EnrolledCourseController = {
    createEnrolledCourse,
    updateEnrolledCourseMarks,
};
