import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/CatchResponse';

const DataValidation = (schema: AnyZodObject): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default DataValidation;
