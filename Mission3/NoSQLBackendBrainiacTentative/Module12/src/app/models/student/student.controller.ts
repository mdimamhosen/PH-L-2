import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';

const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const student = await studentService.getStudent();
    if (!student) {
      throw new Error('An error occurred while retrieving the student');
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Student retrieved successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await studentService.getSingleStudent(req.params.id as string, res);
  } catch (error) {
    next(error);
  }
};

const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log('req.params.id', req.params.id);
    await studentService.deleteSingleStudent(req.params.id as string, res);
  } catch (error) {
    next(error);
  }
};

const updateSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await studentService.updateSingleStudent(
      req.params.id as string,
      req.body.student,
      res,
    );
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  getStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
