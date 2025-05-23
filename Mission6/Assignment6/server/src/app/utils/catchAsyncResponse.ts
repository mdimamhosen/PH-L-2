import { RequestHandler, Request, Response, NextFunction } from 'express';

const catchAsyncResponse = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };
};

export default catchAsyncResponse;
