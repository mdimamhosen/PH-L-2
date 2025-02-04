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
exports.EnrolledCourseService = void 0;
const AppError_1 = require("../../utils/AppError");
const offeredCourse_model_1 = require("../offeredCourse/offeredCourse.model");
const http_status_1 = __importDefault(require("http-status"));
const EnrolledCourse_model_1 = __importDefault(require("./EnrolledCourse.model"));
const student_model_1 = require("../student/student.model");
const mongoose_1 = __importDefault(require("mongoose"));
const semReg_model_1 = require("../semisterRegistration/semReg.model");
const course_model_1 = __importDefault(require("../course/course.model"));
const faculty_model_1 = require("../faculty/faculty.model");
const EnrolledCourse_utils_1 = require("./EnrolledCourse.utils");
const createEnrolledCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { offeredCourse } = payload;
    const isOfferedCourseExist = yield offeredCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Offered course not found');
    }
    if (isOfferedCourseExist.maxCapacity <= 0) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Offered course is full');
    }
    const student = yield student_model_1.Student.findOne({ id: id }).select('_id');
    if (!student) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    const isStudentAlreadyEnrolled = yield EnrolledCourse_model_1.default.findOne({
        semesterRegistration: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration,
        offeredCourse,
        student: student === null || student === void 0 ? void 0 : student._id,
    });
    if (isStudentAlreadyEnrolled) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Student already enrolled');
    }
    const semesterRegistration = yield semReg_model_1.SemesterRegistration.findById(isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration).select('maxCredit');
    if (!semesterRegistration) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Semester registration not found');
    }
    const enrolledCourses = yield EnrolledCourse_model_1.default.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration,
                student: student === null || student === void 0 ? void 0 : student._id,
            },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'courseData',
            },
        },
        {
            $unwind: '$courseData',
        },
        {
            $group: {
                _id: null,
                totalCredit: { $sum: '$courseData.credits' },
            },
        },
        {
            $project: {
                _id: 0,
                totalCredit: 1,
            },
        },
    ]);
    const course = yield course_model_1.default.findById(isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.course).select('credits');
    const totalcredits = enrolledCourses.length > 0 ? enrolledCourses[0].totalCredit : 0;
    if (totalcredits + (course === null || course === void 0 ? void 0 : course.credits) > semesterRegistration.maxCredit) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Student has exceeded the maximum credit limit');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield EnrolledCourse_model_1.default.create({
            semesterRegistration: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.semesterRegistration,
            academicSemester: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.academicSemester,
            academicFaculty: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.academicFaculty,
            academicDepartment: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.academicDepartment,
            offeredCourse,
            course: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.course,
            student: student === null || student === void 0 ? void 0 : student._id,
            faculty: isOfferedCourseExist === null || isOfferedCourseExist === void 0 ? void 0 : isOfferedCourseExist.faculty,
            isEnrolled: true,
        });
        if (!result) {
            throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Enrolled course not created');
        }
        yield offeredCourse_model_1.OfferedCourse.findByIdAndUpdate(offeredCourse, {
            $inc: { maxCapacity: -1 },
        });
        yield session.commitTransaction();
        session.endSession();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
const updateEnrolledCourseMarks = (facultyID, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    console.log('facultyID', facultyID);
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
    const isOfferedCourseExist = yield offeredCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Offered course not found');
    }
    const isSemeseterRegistrationExist = yield semReg_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemeseterRegistrationExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Semester registration not found');
    }
    const isStudentExist = yield student_model_1.Student.findById(student);
    if (!isStudentExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    const faculty = yield faculty_model_1.Faculty.findOne({ id: facultyID }).select('_id');
    if (!faculty) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    const enrolledCourse = yield EnrolledCourse_model_1.default.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty: faculty === null || faculty === void 0 ? void 0 : faculty._id,
    });
    if (!enrolledCourse) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Enrolled course not found for this faculty');
    }
    const modifiedData = Object.assign({}, courseMarks);
    if (Object.keys(modifiedData).length === 0) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'No data to update');
    }
    if (courseMarks === null || courseMarks === void 0 ? void 0 : courseMarks.finalTerm) {
        const { classTest1, midTerm, classTest2 } = enrolledCourse.courseMarks;
        const finalTerm = courseMarks.finalTerm;
        const totalMarks = Math.ceil(classTest1 * 0.1 + midTerm * 0.3 + classTest2 * 0.1 + finalTerm * 0.5);
        const result = (0, EnrolledCourse_utils_1.calculateGradeAndgradePoints)(totalMarks);
        modifiedData.grade = result.grade;
        modifiedData.gradePoints = result.gradePoints;
    }
    if (courseMarks && Object.keys(courseMarks).length > 0) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }
    const result = yield EnrolledCourse_model_1.default.findByIdAndUpdate(enrolledCourse._id, modifiedData, { new: true });
    if (!result) {
        throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Enrolled course marks not updated');
    }
    return result;
});
exports.EnrolledCourseService = {
    createEnrolledCourse,
    updateEnrolledCourseMarks,
};
