import { Model, Types } from 'mongoose';

export type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type Guardian = {
  name: string;
  contactNumber: string;
  relation: string;
};
export type Address = {
  permanentAddress: string;
  currentAddress: string;
};
export interface Student {
  id: string;
  user: Types.ObjectId;
  name: Name;
  age: number;
  email: string;
  gender: 'Male' | 'Female';
  contactNumber: string;
  emergencyContactNumber: string;
  address?: Address;
  dateOfBirth: Date;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: Guardian;
  profilePicture?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
}

// For creating custom instance methods
// export interface StudentMethod {
//   isUserExist(id: string): Promise<Student | null>;
// }

// export type StudentModelMethod = Model<
//   Student,
//   Record<string, never>,
//   StudentMethod
// >;

// For creating custom static methods

export interface StudentStaticMethodModel extends Model<Student> {
  isUserExist(id: string): Promise<Student | null>;
}
