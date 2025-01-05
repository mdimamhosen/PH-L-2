import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    message: 'Route not found',
    success: false,
    error: '',
  });
};

export default notFound;
