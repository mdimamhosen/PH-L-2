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
exports.SemesterRegistrationService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = require("../../utils/AppError");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semReg_model_1 = require("./semReg.model");
const http_status_1 = __importDefault(require("http-status"));
const offeredCourse_model_1 = require("../offeredCourse/offeredCourse.model");
const createSemesterRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    // check if there any semester that is already "ONGOING" or "UPCOMING"
    const isSemisterUpcomingOrOngoing = yield semReg_model_1.SemesterRegistration.findOne({
        $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
    if (isSemisterUpcomingOrOngoing) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, `There is already a semester that is ${isSemisterUpcomingOrOngoing.status.toLowerCase()}`);
    }
    // check if the academic semester is already registered
    const isAcademicSemesterExist = yield academicSemester_model_1.AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Academic semester not found');
    }
    // is semester already registered
    const isAlreadyRegistered = yield semReg_model_1.SemesterRegistration.findOne({
        academicSemester: academicSemester,
    });
    if (isAlreadyRegistered) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Semester is already registered');
    }
    const result = yield semReg_model_1.SemesterRegistration.create(payload);
    return result;
});
const getAllRegistrateredSemesters = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const resultQuery = new QueryBuilder_1.default(semReg_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .fields()
        .pagination();
    const result = yield resultQuery.modelQuery;
    return result;
});
const getSemesterRegistrationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semReg_model_1.SemesterRegistration.findById(id).populate('academicSemester');
    return result;
});
const updateSemesterRegistration = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  if requested semister is ended then it can't be updated
    const semester = yield semReg_model_1.SemesterRegistration.findById(id);
    if (!semester) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Semester not found');
    }
    if ((semester === null || semester === void 0 ? void 0 : semester.status) === 'ENDED') {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Semester is already ended, can not be updated');
    }
    if ((semester === null || semester === void 0 ? void 0 : semester.status) === 'ONGOING' && payload.status === 'UPCOMING') {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Semester is already ongoing, can not be updated');
    }
    if ((semester === null || semester === void 0 ? void 0 : semester.status) === 'UPCOMING' && payload.status === 'ENDED') {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Semester is not ongoing, can not be updated');
    }
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    // check if the academic semester is already registered
    const isAcademicSemesterExist = yield academicSemester_model_1.AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Academic semester not found');
    }
    const result = yield semReg_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const semester = yield semReg_model_1.SemesterRegistration.findById(id);
    if (!semester) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Semester not found');
    }
    if ((semester === null || semester === void 0 ? void 0 : semester.status) !== 'UPCOMING') {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Semester is not upcoming, can not be deleted');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deleteOfferedCourses = yield offeredCourse_model_1.OfferedCourse.deleteMany({
            semesterRegistration: id,
        }, {
            session,
        });
        if (!deleteOfferedCourses) {
            throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error while deleting offered courses');
        }
        const result = yield semReg_model_1.SemesterRegistration.findByIdAndDelete(id, {
            session,
            new: true,
        });
        if (!result) {
            throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error while deleting semester registration');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.SemesterRegistrationService = {
    createSemesterRegistration,
    getAllRegistrateredSemesters,
    getSemesterRegistrationById,
    updateSemesterRegistration,
    deleteSemesterRegistrationFromDB,
};
