import { TAacademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genarateStudentId = async (payload: TAacademicSemester) => {
  const prevStudentId = await findLastStudentId();
  const prevStudentIdYear = prevStudentId?.slice(0, 4);
  const prevStudentIdCode = prevStudentId?.slice(4, 6);
  const prevStudentIdIncrement = prevStudentId?.slice(6, 10);
  const currentStudentIdYear = payload.year;
  const currentStudentIdCode = payload.code;
  if (
    prevStudentIdYear === currentStudentIdYear &&
    prevStudentIdCode === currentStudentIdCode
  ) {
    const incrementId = (Number(prevStudentIdIncrement) + 1)
      .toString()
      .padStart(4, '0');
    return `${currentStudentIdYear}${currentStudentIdCode}${incrementId}`;
  } else {
    return `${currentStudentIdYear}${currentStudentIdCode}0001`;
  }
};

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const genarateFacultyId = async () => {
  let currentFacultyId = (0).toString().padStart(4, '0');
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentFacultyId = (Number(lastFacultyId) + 1).toString().padStart(4, '0');
  } else {
    currentFacultyId = (Number(currentFacultyId) + 1)
      .toString()
      .padStart(4, '0');
  }
  const facultyId = `F-${currentFacultyId}`;
  return facultyId;
};

const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const genarateAdminId = async () => {
  let currentAdminId = (0).toString().padStart(4, '0');
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentAdminId = (Number(lastAdminId) + 1).toString().padStart(4, '0');
  } else {
    currentAdminId = (Number(currentAdminId) + 1).toString().padStart(4, '0');
  }
  const adminId = `A-${currentAdminId}`;
  return adminId;
};
