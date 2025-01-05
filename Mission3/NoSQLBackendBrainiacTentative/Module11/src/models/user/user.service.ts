import config from '../../app/config';
import { Student } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TUser } from './user.interface';
import UserModel from './user.model';

const createStudent = async (student: Student, password: string) => {
  // create a user object
  const user: Partial<TUser> = {};
  // if password is not given, use default password because it is admin route

  user.password = password || (config.defaultPassword as string);
  //   set role as student

  user.role = 'student';
  //   set manually generated id
  user.id = 'STU' + Math.floor(Math.random() * 1000000);
  //   create an User
  const createdUser = await UserModel.create(user);
  //    create a student
  if (Object.keys(student).length > 0) {
    //  set id and _id
    student.id = createdUser.id;
    student.user = createdUser._id;

    const createdStudent = await StudentModel.create(student);
    return createdStudent;
  }
};

export const UserService = {
  createStudent,
};
