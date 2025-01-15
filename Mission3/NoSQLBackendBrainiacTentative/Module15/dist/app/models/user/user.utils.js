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
exports.genarateFacultyId =
  exports.findLastFacultyId =
  exports.genarateStudentId =
    void 0;
const user_model_1 = require('./user.model');
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne(
      {
        role: 'student',
      },
      { id: 1, _id: 0 },
    )
      .sort({ createdAt: -1 })
      .lean();
    return (
      lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id
    )
      ? lastStudent.id
      : undefined;
  });
const genarateStudentId = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const prevStudentId = yield findLastStudentId();
    const prevStudentIdYear =
      prevStudentId === null || prevStudentId === void 0
        ? void 0
        : prevStudentId.slice(0, 4);
    const prevStudentIdCode =
      prevStudentId === null || prevStudentId === void 0
        ? void 0
        : prevStudentId.slice(4, 6);
    const prevStudentIdIncrement =
      prevStudentId === null || prevStudentId === void 0
        ? void 0
        : prevStudentId.slice(6, 10);
    const currentStudentIdYear = payload.year;
    const currentStudentIdCode = payload.code;
    if (
      prevStudentIdYear === currentStudentIdYear &&
      prevStudentIdCode === currentStudentIdCode
    ) {
      const incrementId = (Number(prevStudentIdIncrement) + 1)
        .toString()
        .padStart(4, '0');
      return `${currentStudentIdYear}${currentStudentIdCode}${incrementId}`;
    } else {
      return `${currentStudentIdYear}${currentStudentIdCode}0001`;
    }
  });
exports.genarateStudentId = genarateStudentId;
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne(
      {
        role: 'faculty',
      },
      { id: 1, _id: 0 },
    )
      .sort({ createdAt: -1 })
      .lean();
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? lastFaculty.id.substring(2)
      : undefined;
  });
exports.findLastFacultyId = findLastFacultyId;
const genarateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    let currentFacultyId = (0).toString().padStart(4, '0');
    const lastFacultyId = yield (0, exports.findLastFacultyId)();
    if (lastFacultyId) {
      currentFacultyId = (Number(lastFacultyId) + 1)
        .toString()
        .padStart(4, '0');
    } else {
      currentFacultyId = (Number(currentFacultyId) + 1)
        .toString()
        .padStart(4, '0');
    }
    const facultyId = `F-${currentFacultyId}`;
    return facultyId;
  });
exports.genarateFacultyId = genarateFacultyId;
