export interface IAcademicSemesterData {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAcademicDepartmentData {
  _id: string;
  name: string;
  academicFaculty: IAcademicDepartmentData | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAcademicFacultyData {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
