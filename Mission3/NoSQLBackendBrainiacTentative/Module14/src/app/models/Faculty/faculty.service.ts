// const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {};

import { Faculty } from './faculty.model';

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

export const FacultyServices = {
  //   getAllFacultiesFromDB,
  getSingleFacultyFromDB,
};
