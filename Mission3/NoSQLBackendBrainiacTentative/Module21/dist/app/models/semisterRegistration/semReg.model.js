"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const semReg_constant_1 = require("./semReg.constant");
const semesterRegistrationSchema = new mongoose_1.default.Schema({
    academicSemester: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: {
            values: semReg_constant_1.SEMESTER_REGISTRATION_STATUS,
            message: '{VALUE} is not supported',
        },
        required: true,
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 12,
    },
    maxCredit: {
        type: Number,
        default: 18,
    },
}, {
    timestamps: true,
});
exports.SemesterRegistration = mongoose_1.default.model('SemesterRegistration', semesterRegistrationSchema);
