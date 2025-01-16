'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const config_1 = __importDefault(require('../../config'));
const academicSemester_model_1 = require('../academicSemester/academicSemester.model');
const user_utils_1 = require('./user.utils');
const http_status_1 = __importDefault(require('http-status'));
const student_model_1 = require('../student/student.model');
const AppError_1 = require('../../utils/AppError');
const user_model_1 = require('./user.model');
const academicDepartment_model_1 = require('../academicDepartment/academicDepartment.model');
const faculty_model_1 = require('../faculty/faculty.model');
const createStudentIntoDB = (password, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.defaultPassword;
    userData.role = 'student';
    const AdmissionSemester =
      yield academicSemester_model_1.AcademicSemesterModel.findById(
        payload.admissionSemester,
      );
    if (!AdmissionSemester) {
      throw new AppError_1.AppError(404, 'admissionSemester is null');
    }
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const studentId = yield (0, user_utils_1.genarateStudentId)(
        AdmissionSemester,
      );
      userData.id = studentId;
      const newUser = yield user_model_1.User.create([userData], { session });
      if (!newUser.length) {
        throw new AppError_1.AppError(
          http_status_1.default.BAD_REQUEST,
          'User is not created',
        );
      }
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
      const newStudent = yield student_model_1.Student.create([payload], {
        session,
      });
      if (!newStudent.length) {
        throw new AppError_1.AppError(
          http_status_1.default.BAD_REQUEST,
          'Student is not created',
        );
      }
      yield session.commitTransaction();
      return newStudent;
    } catch (error) {
      yield session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  });
const createFacultyIntoDB = (password, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.defaultPassword;
    userData.role = 'faculty';
    const isAcademicDepartmentExist =
      yield academicDepartment_model_1.AcademicDepartment.findById(
        payload.academicDepartment,
      );
    if (!isAcademicDepartmentExist) {
      throw new AppError_1.AppError(404, 'Academic Department is not exist');
    }
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      userData.id = yield (0, user_utils_1.genarateFacultyId)();
      const isUserExist = yield faculty_model_1.Faculty.isUserExist(
        payload.email,
      );
      if (isUserExist) {
        throw new AppError_1.AppError(
          400,
          'Faculty with this email already exists',
        );
      }
      const newUser = yield user_model_1.User.create([userData], { session });
      if (!newUser.length) {
        throw new AppError_1.AppError(
          http_status_1.default.BAD_REQUEST,
          'User is not created',
        );
      }
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
      // create faculty
      const newFaculty = yield faculty_model_1.Faculty.create([payload], {
        session,
      });
      if (!newFaculty.length) {
        throw new AppError_1.AppError(
          http_status_1.default.BAD_REQUEST,
          'Faculty is not created',
        );
      }
      yield session.commitTransaction();
      yield session.endSession();
      return newFaculty;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw new Error(error);
    }
  });
exports.UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
