import { NextFunction, RequestHandler } from 'express';
import catchAsync from '../utils/CatchResponse';
import { AppError } from '../utils/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = (): RequestHandler => {
  return catchAsync(async (req, res, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'Unauthorized');
    }
    // verify token
    // if token is valid then call next()
    const tokenVarify = await jwt.verify(
      token,
      config.jwtSecret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(401, 'Unauthorized token');
        }

        req.user = decoded as JwtPayload;
      },
    );

    next();
  });
};

export default auth;
