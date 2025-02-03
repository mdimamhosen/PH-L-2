import mongoose from 'mongoose';
import { TSemesterRegistration } from './semReg.interface';
import { SEMESTER_REGISTRATION_STATUS } from './semReg.constant';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: {
        values: SEMESTER_REGISTRATION_STATUS,
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
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
