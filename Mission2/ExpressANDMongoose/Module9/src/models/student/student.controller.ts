import { Request, Response } from 'express';
import { studentService } from './student.service';
import { Student } from './student.interface';

const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const createStudent = await studentService.createStudent(req.body.student);
    if (!createStudent) {
      throw new Error('An error occurred while creating the student');
    }

    if (createStudent) {
      console.log('Student created successfully');
      res.status(200).json({
        message: 'Student created successfully',
        data: createStudent,
        success: true,
      });
    }
  } catch (error) {
    console.log('Error in creating student', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};
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

const getSingleStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await studentService.getSingleStudent(req.params.id);
    if (!student) {
      throw new Error('An error occurred while retrieving the student');
    }

    if (student) {
      console.log('Single student retrieved successfully');
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

export const studentController = {
  createStudent,
  getStudent,
  getSingleStudent,
};
