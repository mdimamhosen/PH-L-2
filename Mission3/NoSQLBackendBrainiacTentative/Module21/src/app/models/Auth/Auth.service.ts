import config from '../../config';
import { AppError } from '../../utils/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './Auth.utils';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';

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

  const accessToken = createToken(
    jwtPayload,
    config.jwtSecret as string,
    config.jwtExpiration as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.jwtRefreshExpiration as string,
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
    refreshToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { id } = user;
  const { oldPassword, newPassword } = payload;

  if (!(await User.isUserExist(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (await User.isUserDeleted(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  if (!(await User.isPasswordMatched(oldPassword, id))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Old password is incorrect');
  }

  if (await User.isUserBlocked(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }
  console.log({
    newPassword,
    oldPassword,
  });
  const newHashedPassword = await bcrypt.hash(newPassword, Number(10));
  await User.findOneAndUpdate(
    {
      id,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true, upsert: true },
  );

  return null;
};

const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, config.jwtRefreshSecret as string);

  const id = decoded.id;
  const user = await User.findOne({ id });
  const iat = decoded.iat;
  // check if user exist
  if (!(await User.isUserExist(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // check if user is deleted
  if (await User.isUserDeleted(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  // check if user is blocked
  if (await User.isUserBlocked(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  // check if password is changed after the token is issued
  if (
    user?.passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password is changed, please login again',
    );
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtSecret as string,
    config.jwtExpiration as string,
  );

  return {
    accessToken,
  };
};

const forgotPassword = async (id: string) => {
  if (!(await User.isUserExist(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (await User.isUserDeleted(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  if (await User.isUserBlocked(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  const user = await User.findOne({ id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const resetToken = createToken(jwtPayload, config.jwtSecret as string, '10m');

  const resetLink = `${config.resetUiUrl}?id=${id}&token=${resetToken}`;
  console.log(resetLink);
  sendEmail(user.email, 'Reset Password', resetLink);

  // return {
  //   accessToken,
  // };
};

const resetPassword = async (
  id: string,
  newPassword: string,
  token: string,
) => {
  if (!(await User.isUserExist(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (await User.isUserDeleted(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  if (await User.isUserBlocked(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  const user = await User.findOne({ id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

  if (decoded.id !== id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Token is invalid');
  }

  const newHashedPassword = await bcrypt.hash(newPassword, Number(10));
  await User.findOneAndUpdate(
    {
      id,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true, upsert: true },
  );

  sendEmail(user.email, 'Password Changed', 'Password changed successfully');

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
