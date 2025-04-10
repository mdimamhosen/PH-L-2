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
exports.AcademicFacultyControllers = void 0;
const CatchResponse_1 = __importDefault(require('../../utils/CatchResponse'));
const sendResponse_1 = __importDefault(require('../../utils/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const academicFaculty_services_1 = require('./academicFaculty.services');
const createAcademicFaculty = (0, CatchResponse_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicFaculty_services_1.AcademicFacultyServices.createAcademicFacultyIntoDB(
        req.body,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: 201,
      success: true,
      message: 'Academic faculty created successfully',
      data: result,
    });
  }),
);
const getAllAcademicFaculties = (0, CatchResponse_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicFaculty_services_1.AcademicFacultyServices.getAllAcademicFacultiesFromDB();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic faculties are retrieved successfully',
      data: result,
    });
  }),
);
const getSingleAcademicFaculty = (0, CatchResponse_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result =
      yield academicFaculty_services_1.AcademicFacultyServices.getSingleAcademicFacultyFromDB(
        facultyId,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic faculty is retrieved succesfully',
      data: result,
    });
  }),
);
const updateAcademicFaculty = (0, CatchResponse_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result =
      yield academicFaculty_services_1.AcademicFacultyServices.updateAcademicFacultyIntoDB(
        facultyId,
        req.body,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic faculty is updated succesfully',
      data: result,
    });
  }),
);
exports.AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
