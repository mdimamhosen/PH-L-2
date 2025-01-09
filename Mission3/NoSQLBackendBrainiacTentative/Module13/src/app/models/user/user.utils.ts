import { TAacademicSemester } from '../academicSemester/academicSemester.interface';
import UserModel from './user.model';
const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
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

// import { TAacademicSemester } from '../academicSemester/academicSemester.interface';
// import UserModel from './user.model';

// const findLastStudentId = async () => {
//   try {
//     const lastStudent = await UserModel.findOne(
//       { role: 'student' },
//       { id: 1, _id: 0 },
//     )
//       .sort({ createdAt: -1 })
//       .lean();

//     return lastStudent?.id || undefined;
//   } catch (error) {
//     console.error('Error fetching the last student ID:', error);
//     throw new Error('Unable to fetch the last student ID');
//   }
// };

// export const generateStudentId = async (payload: TAacademicSemester) => {
//   const { year, code } = payload;

//   if (!year || !code) {
//     throw new Error('Invalid payload: year and code are required');
//   }

//   const prevStudentId = await findLastStudentId();
//   const prevStudentIdYear = prevStudentId?.slice(0, 4);
//   const prevStudentIdCode = prevStudentId?.slice(4, 6);
//   const prevStudentIdIncrement = prevStudentId?.slice(6, 10);

//   if (prevStudentIdYear === year && prevStudentIdCode === code) {
//     const incrementId = (Number(prevStudentIdIncrement) + 1)
//       .toString()
//       .padStart(4, '0');
//     return `${year}${code}${incrementId}`;
//   } else {
//     return `${year}${code}0001`;
//   }
// };
