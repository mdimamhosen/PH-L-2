import { AppError } from '../../utils/AppError';
import { IUser } from './User.interface';
import { User } from './User.model';
import { genarateAdminId, genarateUserId } from './User.utils';
import httpStatus from 'http-status';

const createAdmin = async (payload: IUser) => {
  const UserData: Partial<IUser> = {};

  UserData.role = 'admin';
  UserData.name = payload.name;
  UserData.email = payload.email;
  UserData.password = payload.password;

  UserData.id = await genarateAdminId();

  const newUser = await User.create(UserData);

  if (!newUser) {
    throw new AppError('User is not created', httpStatus.BAD_REQUEST);
  }
  return newUser;
};

const createUser = async (payload: IUser) => {
  const UserData: Partial<IUser> = {};

  UserData.role = 'user';
  UserData.name = payload.name;
  UserData.email = payload.email;
  UserData.password = payload.password;

  UserData.id = await genarateUserId();

  const newUser = await User.create(UserData);

  if (!newUser) {
    throw new AppError('User is not created', httpStatus.BAD_REQUEST);
  }
  return newUser;
};

const blockUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return updatedUser;
};

export const UserServices = {
  createAdmin,
  createUser,
  blockUser,
};
