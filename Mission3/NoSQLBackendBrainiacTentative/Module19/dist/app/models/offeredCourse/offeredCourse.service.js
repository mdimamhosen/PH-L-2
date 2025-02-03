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
exports.OfferedCourseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = require("../../utils/AppError");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const course_model_1 = __importDefault(require("../course/course.model"));
const faculty_model_1 = require("../faculty/faculty.model");
const semReg_model_1 = require("../semisterRegistration/semReg.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const offeredCourse_utils_1 = require("./offeredCourse.utils");
const http_status_1 = __importDefault(require("http-status"));
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, } = payload;
    const isSemesterRegistrationExist = yield semReg_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.AppError(404, 'Semester Registration not found');
    }
    const isAcademicFacultyExist = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.AppError(404, 'Academic Faculty not found');
    }
    const isAcademicDepartmentExist = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.AppError(404, 'Academic Department not found');
    }
    const isCourseExist = yield course_model_1.default.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.AppError(404, 'Course not found');
    }
    const isFacultyExist = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.AppError(404, 'Faculty not found');
    }
    const academicSemester = isSemesterRegistrationExist.academicSemester;
    //   check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment,
    });
    //   console.log({
    //     isDepartmentBelongToFaculty,
    //     isAcademicDepartmentExist,
    //     isAcademicFacultyExist,
    //   });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError_1.AppError(400, 'Department does not belong to the faculty');
    }
    const isSameOfferedCourseExistWithSameSection = yield offeredCourse_model_1.OfferedCourse.findOne({
        semesterRegistration,
        section: payload.section,
        course,
    });
    if (isSameOfferedCourseExistWithSameSection) {
        throw new AppError_1.AppError(400, 'Same course with same section already exist');
    }
    //   get the schedule of the faculties
    const assignedSchedules = yield offeredCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: payload.days },
    }).select('days startTime endTime -_id');
    const newPayloadSchedule = {
        days: payload.days,
        startTime: payload.startTime,
        endTime: payload.endTime,
    };
    const isItHasTimeConflict = (0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedules, newPayloadSchedule);
    if (isItHasTimeConflict) {
        throw new AppError_1.AppError(400, 'Time conflict with the assigned schedule');
    }
    const result = yield offeredCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
const getAllOfferedCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourseQuery = new QueryBuilder_1.default(offeredCourse_model_1.OfferedCourse.find(), query)
        .filter()
        .sort()
        .pagination()
        .fields();
    const result = yield offeredCourseQuery.modelQuery;
    return result;
});
const getSingleOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourse = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!offeredCourse) {
        throw new AppError_1.AppError(404, 'Offered Course not found');
    }
    return offeredCourse;
});
const deleteOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */
    const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Offered Course not found');
    }
    const semesterRegistation = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semReg_model_1.SemesterRegistration.findById(semesterRegistation).select('status');
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, `Offered course can not update ! because the semester ${semesterRegistrationStatus}`);
    }
    const result = yield offeredCourse_model_1.OfferedCourse.findByIdAndDelete(id);
    return result;
});
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, days, startTime, endTime } = payload;
    const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError_1.AppError(404, 'Offered Course not found');
    }
    const isFacultyExists = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Faculty not found !');
    }
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semReg_model_1.SemesterRegistration.findById(semesterRegistration).select('status');
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, `Offered course can not update ! because the semester ${semesterRegistrationStatus}`);
    }
    const assignedSchedules = yield offeredCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime -_id');
    const newPayloadSchedule = {
        days,
        startTime,
        endTime,
    };
    const isItHasTimeConflict = (0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedules, newPayloadSchedule);
    if (isItHasTimeConflict) {
        throw new AppError_1.AppError(400, 'Time conflict with the assigned schedule');
    }
    const result = yield offeredCourse_model_1.OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
    deleteOfferedCourseFromDB,
};
