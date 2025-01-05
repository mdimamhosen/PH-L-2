import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student, password } = req.body;
    const result = await UserService.createStudent(student, password);
    res.status(200).json({
      message: 'Student created successfully',
      data: result,
      success: true,
    });
    console.log('Student created successfully');
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
