import { Request, Response } from 'express';
import { studentService } from './student.service';
import { Student } from './student.interface';
import Joi from 'joi';
import StudentValidationSchema from './student.joi.validation';
import { z } from 'zod';
import StudentValidationSchemaWithZod from './student.validation';

const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body with Joi
    // const { error, value } = StudentValidationSchema.validate(req.body.student);
    // if (error) {
    //   console.log('Error in creating student', error);
    //   res.status(400).json({ message: error.message, success: false });
    // }
    // const createdStudent = await studentService.createStudent(value);

    // Validate request body with Zod

    const ZodValidationData = StudentValidationSchemaWithZod.safeParse(
      req.body.student,
    );
    if (ZodValidationData.success === false) {
      // Log validation error details
      console.log('Error in creating student', ZodValidationData.error);

      // Send structured validation errors in the response
      res.status(400).json({
        message: 'Validation failed',
        errors: ZodValidationData.error.errors, // Provide more detailed error information
        success: false,
      });
      return;
    }
    const validatedStudent = ZodValidationData.data;
    const createdStudent = await studentService.createStudent(
      validatedStudent,
      res,
    );
    console.log('Student created successfully');
  } catch (error: any) {
    console.log('Error in creating student', error);
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
    const student = await studentService.getSingleStudent(
      req.params.id as string,
      res,
    );
  } catch (error: any) {
    console.log('Error in retrieving student', error);
  }
};

const deleteSingleStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log('req.params.id', req.params.id);
    const student = await studentService.deleteSingleStudent(
      req.params.id as string,
      res,
    );
  } catch (error) {
    console.log('Error in deleting student', error);
  }
};

const updateSingleStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const student = await studentService.updateSingleStudent(
      req.params.id as string,
      req.body.student,
      res,
    );
  } catch (error: any) {
    console.log('Error in updating student', error);
  }
};

export const studentController = {
  createStudent,
  getStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
