import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TUser } from './user.interface';
import UserModel from './user.model';
import { genarateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: Student) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const AdmissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  //set  generated id
  if (AdmissionSemester) {
    const studentId = await genarateStudentId(AdmissionSemester);
    userData.id = studentId;
  } else {
    throw new Error('admissionSemester is null');
  }

  // create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
