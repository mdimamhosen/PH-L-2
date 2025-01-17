import { AppError } from '../../utils/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semReg.interface';
import { SemesterRegistration } from './semReg.model';
import httpStatus from 'http-status';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  // check if the academic semester is already registered

  const isAcademicSemesterExist =
    await AcademicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already registered');
  }

  // is semester already registered
  const isAlreadyRegistered = await SemesterRegistration.findOne({
    academicSemester: academicSemester,
  });

  if (isAlreadyRegistered) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester is already registered',
    );
  }
};

const getAllRegistrateredSemesters = async () => {};

const getSemesterRegistrationById = async () => {};

const updateSemesterRegistration = async () => {};

const deleteSemesterRegistration = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllRegistrateredSemesters,
  getSemesterRegistrationById,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
