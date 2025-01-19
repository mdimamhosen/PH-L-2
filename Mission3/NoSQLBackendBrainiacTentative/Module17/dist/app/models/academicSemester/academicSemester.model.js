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
exports.AcademicSemesterModel = void 0;
const mongoose_1 = require('mongoose');
const academicSemester_const_1 = require('./academicSemester.const');
const AppError_1 = require('../../utils/AppError');
const AcademicSemesterSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      enum: {
        values: academicSemester_const_1.academicSemesterNames,
        message: '{VALUE} Invalid name',
      },
      required: [true, 'name is required'],
    },
    code: {
      type: String,
      enum: {
        values: academicSemester_const_1.academicSemesterCodes,
        message: '{VALUE} Invalid code',
      },
      required: [true, 'code is required'],
    },
    year: {
      type: String,
      required: [true, 'year is required'],
    },
    startMonth: {
      type: String,
      enum: {
        values: academicSemester_const_1.academicMonths,
        message: '{VALUE} Invalid startMonth',
      },
      required: [true, 'startMonth is required'],
    },
    endMonth: {
      type: String,
      enum: {
        values: academicSemester_const_1.academicMonths,
        message: '{VALUE} Invalid endMonth',
      },
      required: [true, 'endMonth is required'],
    },
  },
  {
    timestamps: true,
  },
);
AcademicSemesterSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    const isSemesterExistOnThisYear =
      yield exports.AcademicSemesterModel.findOne({
        year: this.year,
        name: this.name,
      });
    if (isSemesterExistOnThisYear) {
      throw new AppError_1.AppError(404, 'Semester already exist on this year');
    }
    next();
  });
});
exports.AcademicSemesterModel = (0, mongoose_1.model)(
  'AcademicSemester',
  AcademicSemesterSchema,
);
