import { configurations } from '../../config/configurations';
import { AppError } from '../../utils/AppError';
import { User } from '../User/User.model';
import { IUserLogin } from './Auth.interface';
import { createToken } from './Auth.utils';
import httpStatus from 'http-status';

const loginUser = async (payload: IUserLogin) => {
  console.log('payload', payload);

  const { email, password } = payload;

  if (!(await User.isUserExist(email))) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }

  if (await User.isUserDeleted(email)) {
    throw new AppError('User is deleted', httpStatus.BAD_REQUEST);
  }

  if (await User.isUserBlocked(email)) {
    throw new AppError('User is blocked', httpStatus.BAD_REQUEST);
  }

  if (!(await User.isPasswordMatched(password, email))) {
    throw new AppError('Password is incorrect', httpStatus.BAD_REQUEST);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('User not found', httpStatus.NOT_FOUND);
  }
  // create token and send to the user
  const jwtPayload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    configurations.jwtSecret as string,
    configurations.jwtExpiration as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    configurations.jwtRefreshSecret as string,
    configurations.jwtRefreshExpiration as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
