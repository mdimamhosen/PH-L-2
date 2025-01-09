import { Response } from 'express';
import { Student } from './student.interface';
import StudentModel from './student.model';

const getStudent = async (): Promise<Student[] | null> => {
  try {
    const students = await StudentModel.find();
    return students || null;
  } catch (error) {
    console.error('Error in retrieving student:', error);
    return null;
  }
};

const getSingleStudent = async (id: string, res: Response): Promise<void> => {
  try {
    const student = await StudentModel.findById({ _id: Object(id) });
    console.log('student:-', student);

    if (!student) {
      console.error('Student not found');
      res.status(404).json({
        message: 'Student not found',
        success: false,
      });
      return;
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
    console.error('Error in retrieving student:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

const deleteSingleStudent = async (id: string, res: Response) => {
  try {
    const student = await StudentModel.findByIdAndUpdate(
      { _id: Object(id) },
      { isDeleted: true },
    );
    if (!student) {
      console.error('Student not found');
      res.status(404).json({
        message: 'Student not found',
        success: false,
      });
      return;
    }
    if (student) {
      console.log('Student deleted successfully');
      res.status(200).json({
        message: 'Student deleted successfully',
        success: true,
      });
    }
  } catch (error) {
    console.error('Error in retrieving student:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

const updateSingleStudent = async (
  id: string,
  student: Student,
  res: Response,
): Promise<void> => {
  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      { _id: Object(id) },
      student,
      { new: true },
    );
    if (!updatedStudent) {
      console.error('Student not found');
      res.status(404).json({
        message: 'Student not found',
        success: false,
      });
      return;
    }
    if (updatedStudent) {
      console.log('Student updated successfully');
      res.status(200).json({
        message: 'Student updated successfully',
        data: updatedStudent,
        success: true,
      });
    }
  } catch (error) {
    console.error('Error in updating student:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

export const studentService = {
  getStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
