import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';

import { TUser } from './user.interface';
import { genarateStudentId } from './user.utils';
import httpStatus from 'http-status';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { AppError } from '../../utils/AppError';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.defaultPassword as string);
  userData.role = 'student';

  const AdmissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  if (!AdmissionSemester) {
    throw new AppError(404, 'admissionSemester is null');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const studentId = await genarateStudentId(AdmissionSemester);
    userData.id = studentId;

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not created');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student is not created');
    }

    await session.commitTransaction();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
