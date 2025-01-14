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
