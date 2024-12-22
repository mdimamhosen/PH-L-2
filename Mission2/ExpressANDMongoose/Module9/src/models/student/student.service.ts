import { Student } from './student.interface';
import StudentModel from './student.model';

const createStudent = async (student: Student): Promise<Student | null> => {
  try {
    const createdStudent = await StudentModel.create(student);
    return createdStudent || null;
  } catch (error) {
    console.error('Error in creating student:', error);
    return null;
  }
};
const getStudent = async (): Promise<Student[] | null> => {
  try {
    const students = await StudentModel.find();
    return students || null;
  } catch (error) {
    console.error('Error in retrieving student:', error);
    return null;
  }
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  try {
    const student = await StudentModel.findOne({ id: id });
    return student || null;
  } catch (error) {
    console.error('Error in retrieving student:', error);
    return null;
  }
};

export const studentService = {
  createStudent,
  getStudent,
  getSingleStudent,
};
