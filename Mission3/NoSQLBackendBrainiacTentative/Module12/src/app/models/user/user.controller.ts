import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student, password } = req.body;
    const result = await UserService.createStudent(student, password);
    const data = {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Student created successfully',
      data: result,
    };
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
