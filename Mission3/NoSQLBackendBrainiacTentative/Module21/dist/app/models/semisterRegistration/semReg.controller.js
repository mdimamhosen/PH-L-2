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
exports.SemesterRegistrationController = void 0;
const CatchResponse_1 = __importDefault(require("../../utils/CatchResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const semReg_services_1 = require("./semReg.services");
const createSemesterRegistration = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resutl = yield semReg_services_1.SemesterRegistrationService.createSemesterRegistration(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: 'Semester Registration Created Successfully',
        data: resutl,
        success: true,
    });
}));
const getAllRegisteredSemester = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semReg_services_1.SemesterRegistrationService.getAllRegistrateredSemesters(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'All registered semesters',
        data: result,
        success: true,
    });
}));
const getSingleRegisteredSemester = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semReg_services_1.SemesterRegistrationService.getSemesterRegistrationById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Single registered semester',
        data: result,
        success: true,
    });
}));
const updateRegisteredSemistered = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semReg_services_1.SemesterRegistrationService.updateSemesterRegistration(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Semester Registration Updated Successfully',
        data: result,
        success: true,
    });
}));
exports.SemesterRegistrationController = {
    createSemesterRegistration,
    getAllRegisteredSemester,
    getSingleRegisteredSemester,
    updateRegisteredSemistered,
};
