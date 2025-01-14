import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error.interface';
import config from '../config';
import { ZodErrorHandler } from '../errors/ZodError';
import { MongooseErrorHandler } from '../errors/MongooseError';
import { handleCastError } from '../errors/CastError';
import { handleDuplicateError } from '../errors/DuplicateError';
import { AppError } from '../utils/AppError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';

  let errorSource: TErrorSource = [
    {
      path: error.path || 'unknown',
      message: error.message || 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = ZodErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = MongooseErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error.message || 'Something went wrong',
      },
    ];
  } else if (error instanceof Error) {
    statusCode = 500;
    message = 'Internal server error';
    errorSource = [
      {
        path: '',
        message: 'Something went wrong',
      },
    ];
  }

  res.status(statusCode).json({
    message,
    success: false,
    errorSource,
    stack: config.nodeEnv === 'development' ? error.stack : null,
  });
};

export default globalErrorHandler;
