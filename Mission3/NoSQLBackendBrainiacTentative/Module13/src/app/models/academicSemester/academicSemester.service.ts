import { SemisterCodeMapper } from './academicSemester.const';
import { TAacademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemester = async (payload: TAacademicSemester) => {
  if (SemisterCodeMapper[payload.code] !== payload.name) {
    throw new Error('Semester code and name does not match');
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<TAacademicSemester>,
) => {
  if (
    payload.code &&
    payload.name &&
    SemisterCodeMapper[payload.code] !== payload.name
  ) {
    throw new Error('Semester code and name does not match');
  }

  const result = await AcademicSemesterModel.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
