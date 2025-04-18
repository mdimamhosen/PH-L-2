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
exports.AcademicSemesterController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const CatchResponse_1 = __importDefault(require("../../utils/CatchResponse"));
const academicSemester_service_1 = require("./academicSemester.service");
const createAcademicSemester = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.AcademicSemesterService.createAcademicSemester(req.body);
    const data = {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Academic semester is created successfully',
        data: result,
    };
    (0, sendResponse_1.default)(res, data);
}));
const getSingleAcademicSemester = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const result = yield academicSemester_service_1.AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic semester is retrieved succesfully',
        data: result,
    });
}));
const getAllAcademicSemesters = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.AcademicSemesterService.getAllAcademicSemestersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic semesters are retrieved successfully',
        data: result,
    });
}));
const updateAcademicSemester = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const result = yield academicSemester_service_1.AcademicSemesterService.updateAcademicSemesterFromDB(semesterId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic semester is updated successfully',
        data: result,
    });
}));
exports.AcademicSemesterController = {
    createAcademicSemester,
    getSingleAcademicSemester,
    getAllAcademicSemesters,
    updateAcademicSemester,
};
