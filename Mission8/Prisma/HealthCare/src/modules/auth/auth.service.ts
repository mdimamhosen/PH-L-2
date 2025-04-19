import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../utils/JWT';
import bcrypt from 'bcrypt';
import { UserStatus } from '@prisma/client';
import { prisma } from '../../utils';
import { AppError } from '../../utils/AppError';
import { emailSender } from '../../utils/EmailSender';

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error('Password incorrect!');
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret,
    );
  } catch (err) {
    throw new Error('You are not authorized!');
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error('Password incorrect!');
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: 'Password changed successfully!',
  };
};

const forgetPassword = async (email: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new AppError('User not found', 404);
  }

  const resetToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_password_secret as Secret,
    config.jwt.reset_password_expires_in as string,
  );

  const resetPasswordLink = `${config.reset_pass_link}?token=${resetToken}&email=${userData.email}`;
  const emailTemplate = `<p>Click the link below to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>`;

  await emailSender(email, 'Reset Password Link', emailTemplate);

  return {
    message: 'Reset password link sent to your email!',
  };
};

const resetPassword = async (
  token: string,
  email: string,
  newPassword: string,
) => {
  let decodedData;
  console.log({ token, email });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus.ACTIVE,
    },
  });

  const isTokenValid = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_password_secret as Secret,
  );
  if (!isTokenValid) {
    throw new AppError('Invalid or expired token', 400);
  }
  const hashedPassword: string = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
