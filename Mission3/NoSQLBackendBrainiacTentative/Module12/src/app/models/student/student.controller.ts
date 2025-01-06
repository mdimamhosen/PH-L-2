import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';

const getStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await studentService.getStudent();
    if (!student) {
      throw new Error('An error occurred while retrieving the student');
    }

    if (student) {
      console.log('Student retrieved successfully');
      res.status(200).json({
        message: 'Student retrieved successfully',
        data: student,
        success: true,
      });
    }
  } catch (error) {
    console.log('Error in retrieving student', error);
    res.status(500).json({ message: 'Internal server error', success: false });
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
