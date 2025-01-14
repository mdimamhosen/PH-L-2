import { Response, RequestHandler } from 'express';
import { Request } from 'express';
import { NextFunction } from 'express';
const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };
};
export default catchAsync;
