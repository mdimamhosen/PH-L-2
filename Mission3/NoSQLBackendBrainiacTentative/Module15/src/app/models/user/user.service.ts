import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TUser } from './user.interface';
import {
  genarateAdminId,
  genarateFacultyId,
  genarateStudentId,
} from './user.utils';
import httpStatus from 'http-status';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { AppError } from '../../utils/AppError';
import { User } from './user.model';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);

  userData.role = 'faculty';

  const isAcademicDepartmentExist = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!isAcademicDepartmentExist) {
    throw new AppError(404, 'Academic Department is not exist');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await genarateFacultyId();

    const isUserExist = await Faculty.isUserExist(payload.email);
    if (isUserExist) {
      throw new AppError(400, 'Faculty with this email already exists');
    }

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not created');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create faculty

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faculty is not created');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = 'admin';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await genarateAdminId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not created');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Admin is not created');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
