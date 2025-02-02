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
exports.UserController = void 0;
const sendResponse_1 = __importDefault(require('../../utils/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const CatchResponse_1 = __importDefault(require('../../utils/CatchResponse'));
const user_service_1 = require('./user.service');
const createStudent = (0, CatchResponse_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { student, password } = req.body;
    const result = yield user_service_1.UserServices.createStudentIntoDB(
      password,
      student,
    );
    const data = {
      success: true,
      statusCode: http_status_1.default.CREATED,
      message: 'Student created successfully',
      data: result,
    };
    (0, sendResponse_1.default)(res, data);
  }),
);
const createFaculty = (0, CatchResponse_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty: facultyData } = req.body;
    const result = yield user_service_1.UserServices.createFacultyIntoDB(
      password,
      facultyData,
    );
    const data = {
      success: true,
      statusCode: http_status_1.default.CREATED,
      message: 'Faculty created successfully',
      data: result,
    };
    (0, sendResponse_1.default)(res, data);
  }),
);
const createAdmin = (0, CatchResponse_1.default)(() =>
  __awaiter(void 0, void 0, void 0, function* () {}),
);
exports.UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
