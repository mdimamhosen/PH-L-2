import { NextFunction, RequestHandler } from 'express';
import catchAsync from '../utils/CatchResponse';
import { AppError } from '../utils/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../models/user/user.const';
import { User } from '../models/user/user.model';
import httpStatus from 'http-status';

const auth = (...roles: TUserRole[]): RequestHandler => {
  return catchAsync(async (req, res, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'Unauthorized token');
    }
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    const role = decoded.role;
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
      User.isJwtIssuedBeforePasswordChange(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Password is changed, please login again',
      );
    }
    // check if password is correct
    if (roles && !roles.includes(role as TUserRole)) {
      throw new AppError(403, 'Forbidden access to this route for this role');
    }
    req.user = decoded;
    next();
  });
};

export default auth;
