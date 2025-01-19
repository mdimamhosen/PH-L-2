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
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterService = void 0;
const AppError_1 = require('../../utils/AppError');
const academicSemester_const_1 = require('./academicSemester.const');
const academicSemester_model_1 = require('./academicSemester.model');
const createAcademicSemester = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      academicSemester_const_1.SemisterCodeMapper[payload.code] !== payload.name
    ) {
      throw new AppError_1.AppError(
        404,
        'Semester code and name does not match',
      );
    }
    const result =
      yield academicSemester_model_1.AcademicSemesterModel.create(payload);
    return result;
  });
const getAllAcademicSemestersFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemesterModel.find();
    return result;
  });
const getSingleAcademicSemesterFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicSemester_model_1.AcademicSemesterModel.findById(id);
    return result;
  });
const updateAcademicSemesterFromDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      payload.code &&
      payload.name &&
      academicSemester_const_1.SemisterCodeMapper[payload.code] !== payload.name
    ) {
      throw new AppError_1.AppError(
        404,
        'Semester code and name does not match',
      );
    }
    const result =
      yield academicSemester_model_1.AcademicSemesterModel.findByIdAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        },
      );
    return result;
  });
exports.AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
