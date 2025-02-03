import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../utils/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semReg.interface';
import { SemesterRegistration } from './semReg.model';
import httpStatus from 'http-status';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;
  // check if there any semester that is already "ONGOING" or "UPCOMING"

  const isSemisterUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (isSemisterUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already a semester that is ${isSemisterUpcomingOrOngoing.status.toLowerCase()}`,
    );
  }

  // check if the academic semester is already registered

  const isAcademicSemesterExist =
    await AcademicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  // is semester already registered
  const isAlreadyRegistered = await SemesterRegistration.findOne({
    academicSemester: academicSemester,
  });

  if (isAlreadyRegistered) {
    throw new AppError(httpStatus.CONFLICT, 'Semester is already registered');
  }
  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllRegistrateredSemesters = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .fields()
    .pagination();

  const result = await resultQuery.modelQuery;

  return result;
};

const getSemesterRegistrationById = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //  if requested semister is ended then it can't be updated
  const semester = await SemesterRegistration.findById(id);
  if (!semester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester not found');
  }
  if (semester?.status === 'ENDED') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Semester is already ended, can not be updated',
    );
  }
  if (semester?.status === 'ONGOING' && payload.status === 'UPCOMING') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Semester is already ongoing, can not be updated',
    );
  }
  if (semester?.status === 'UPCOMING' && payload.status === 'ENDED') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Semester is not ongoing, can not be updated',
    );
  }

  const academicSemester = payload?.academicSemester;
  // check if the academic semester is already registered

  const isAcademicSemesterExist =
    await AcademicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const semester = await SemesterRegistration.findById(id);
  if (!semester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester not found');
  }

  if (semester?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Semester is not upcoming, can not be deleted',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteOfferedCourses = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );
    if (!deleteOfferedCourses) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Error while deleting offered courses',
      );
    }

    const result = await SemesterRegistration.findByIdAndDelete(id, {
      session,
      new: true,
    });
    if (!result) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Error while deleting semester registration',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllRegistrateredSemesters,
  getSemesterRegistrationById,
  updateSemesterRegistration,
  deleteSemesterRegistrationFromDB,
};
