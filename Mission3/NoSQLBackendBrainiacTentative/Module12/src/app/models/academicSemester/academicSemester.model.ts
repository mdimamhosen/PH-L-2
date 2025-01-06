import { model, Schema } from 'mongoose';
import { TAacademicSemester } from './academicSemester.interface';
import {
  academicMonths,
  academicSemesterCodes,
  academicSemesterNames,
} from './academicSemester.const';

const AcademicSemesterSchema = new Schema(
  {
    name: {
      type: String,
      enum: {
        values: academicSemesterNames,
        message: '{VALUE} Invalid name',
      },
      required: [true, 'name is required'],
    },
    code: {
      type: String,
      enum: {
        values: academicSemesterCodes,
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
        values: academicMonths,
        message: '{VALUE} Invalid startMonth',
      },
      required: [true, 'startMonth is required'],
    },
    endMonth: {
      type: String,
      enum: {
        values: academicMonths,
        message: '{VALUE} Invalid endMonth',
      },
      required: [true, 'endMonth is required'],
    },
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExistOnThisYear = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExistOnThisYear) {
    throw new Error('Semester already exist on this year');
  }
  next();
});

export const AcademicSemesterModel = model<TAacademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
