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
import { JwtPayload } from 'jsonwebtoken';
import { uploadImageToCloudinary } from '../../utils/sendEmailToCloudinary';

const createStudentIntoDB = async (
  password: string,
  payload: TStudent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.defaultPassword as string);
  userData.role = 'student';

  userData.email = payload.email;

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

    const imagename = `${studentId}-${payload?.name.firstName}-${payload.name.lastName}`;

    // send image to cloudinary
    const { secure_url } = await uploadImageToCloudinary(
      file.path,
      imagename,
      'student',
    );

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not created');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg = secure_url;

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
  userData.email = payload.email;

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
  userData.email = payload.email;

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

const getMe = async (user: JwtPayload) => {
  const { id, role } = user;

  if (role === 'student') {
    const student = await Student.findOne({ id }).populate('user');
    return student;
  }

  if (role === 'faculty') {
    const faculty = await Faculty.findOne({ id }).populate('user');
    return faculty;
  }

  if (role === 'admin') {
    const admin = await Admin.findOne({ id }).populate('user');
    return admin;
  }
  throw new AppError(400, 'User not found');
};

const changeStatus = async (id: string, body: { status: string }) => {
  const { status } = body;
  const result = await User.findByIdAndUpdate(id, { status }, { new: true });
  if (!result) {
    throw new AppError(400, 'User not found');
  }
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
