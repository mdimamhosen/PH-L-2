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
exports.Faculty = exports.userNameSchema = void 0;
const mongoose_1 = require('mongoose');
const faculty_constant_1 = require('./faculty.constant');
const AppError_1 = require('../../utils/AppError');
exports.userNameSchema = new mongoose_1.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [50, 'First Name can not be more than 50 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [50, 'Last Name can not be more than 50 characters'],
  },
});
const facultySchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required'],
      unique: true,
    },
    user: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: exports.userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: faculty_constant_1.Gender,
        message: '{VALUE} is not supported for gender.',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact No is required'],
      trim: true,
      // match: [
      // /^\d{10}$/,
      // 'Please fill a valid 10 digit Contact No',
      // ],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact No is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: faculty_constant_1.BloodGroup,
        message: '{VALUE} is not supported for blood group.',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    profileImg: {
      type: String,
    },
    academicDepartment: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Academic Department is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);
facultySchema.statics.isUserExist = function (email) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield this.findOne({ email, isDeleted: { $ne: true } });
  });
};
// chcking wheather any user with this email
facultySchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    const existingFaculty = yield exports.Faculty.findOne({
      email: this.email,
      isDeleted: { $ne: true },
    });
    if (existingFaculty) {
      throw new AppError_1.AppError(
        404,
        'Faculty with this email already exists',
      );
    }
    next();
  });
});
// generating
facultySchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// filter out the deleted faculty
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// checking if user is already exist
facultySchema.statics.isUserExist = function (id) {
  return __awaiter(this, void 0, void 0, function* () {
    const existingUser = yield exports.Faculty.findOne({ id });
    return existingUser;
  });
};
exports.Faculty = (0, mongoose_1.model)('Faculty', facultySchema);
