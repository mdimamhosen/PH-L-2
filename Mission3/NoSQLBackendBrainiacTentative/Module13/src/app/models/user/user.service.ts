import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../utils/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';

import { TUser } from './user.interface';
import UserModel from './user.model';
import { genarateStudentId } from './user.utils';
import httpStatus from 'http-status';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const AdmissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    //set  generated id
    if (AdmissionSemester) {
      const studentId = await genarateStudentId(AdmissionSemester);
      userData.id = studentId;
    } else {
      throw new AppError(404, 'admissionSemester is null');
    }

    // create a user
    const newUser = await UserModel.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not created');
    } else {
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
      // trasaction 2
      const newStudent = await Student.create([payload], { session });
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Student is not created');
      }

      // commit transaction
      await session.commitTransaction();

      // end session
      await session.endSession();

      return newStudent;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // abort transaction
    await session.abortTransaction();
    // end session
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
