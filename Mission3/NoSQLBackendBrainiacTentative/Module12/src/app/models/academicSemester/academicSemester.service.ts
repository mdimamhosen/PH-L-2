import { TAacademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

export type TSemisterNameCodeMapper = {
  [key: string]: string;
};

const createAcademicSemester = async (payload: TAacademicSemester) => {
  const SemisterCodeMapper: TSemisterNameCodeMapper = {
    '01': 'Autumn',
    '02': 'Spring',
    '03': 'Fall',
  };

  if (SemisterCodeMapper[payload.code] !== payload.name) {
    throw new Error('Semester code and name does not match');
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
