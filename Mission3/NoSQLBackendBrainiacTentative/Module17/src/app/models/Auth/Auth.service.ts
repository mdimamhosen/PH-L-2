import config from '../../config';
import { AppError } from '../../utils/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  console.log('payload', payload);

  const { id, password } = payload;

  if (!(await User.isUserExist(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (await User.isUserDeleted(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  if (await User.isUserBlocked(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  if (!(await User.isPasswordMatched(password, id))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is incorrect');
  }

  const user = await User.findOne({ id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // create token and send to the user
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: config.jwtExpiration,
  });

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
