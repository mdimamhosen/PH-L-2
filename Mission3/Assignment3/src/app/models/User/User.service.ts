import { AppError } from '../../utils/AppError';
import { IUser } from './User.interface';
import { User } from './User.model';
import { genarateAdminId } from './User.utils';
import httpStatus from 'http-status';

const createAdmin = async (payload: IUser) => {
  const UserData: Partial<IUser> = {};

  UserData.role = 'admin';
  UserData.name = payload.name;
  UserData.email = payload.email;
  UserData.password = payload.password;
  UserData.isBlocked = payload.isBlocked;
  UserData.isDeleted = payload.isDeleted;

  UserData.id = await genarateAdminId();

  const newUser = await User.create(UserData);

  if (!newUser) {
    throw new AppError('User is not created', httpStatus.BAD_REQUEST);
  }
  return newUser;
};

export const UserServices = {
  createAdmin,
};
