import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const facultyUserNameValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name must be at least 2 characters long' })
    .max(50, { message: 'First Name cannot exceed 50 characters' })
    .refine(value => /^[A-Z]/.test(value.trim()), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .max(50, { message: 'Last Name cannot exceed 50 characters' }),
});

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 8 characters long' }),
    faculty: z.object({
      designation: z
        .string()
        .min(2, { message: 'Designation must be at least 2 characters long' }),
      name: facultyUserNameValidation,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateFacultyUserNameValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name must be at least 2 characters long' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
});

export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().optional(),
      name: updateFacultyUserNameValidation.optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
