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
exports.UserController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const CatchResponse_1 = __importDefault(require("../../utils/CatchResponse"));
const user_service_1 = require("./user.service");
const createStudent = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student } = req.body;
    const file = req.file;
    const result = yield user_service_1.UserServices.createStudentIntoDB(password, student, file);
    const data = {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Student created successfully',
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const createFaculty = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty: facultyData } = req.body;
    const result = yield user_service_1.UserServices.createFacultyIntoDB(password, facultyData);
    const data = {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Faculty created successfully',
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const createAdmin = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin: adminData } = req.body;
    const result = yield user_service_1.UserServices.createAdminIntoDB(password, adminData);
    const data = {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Admin created successfully',
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const getMe = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getMe(req.user);
    const data = {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User data',
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const changeStatus = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserServices.changeStatus(id, req.body);
    const data = {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Status changed successfully',
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
exports.UserController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus,
};
