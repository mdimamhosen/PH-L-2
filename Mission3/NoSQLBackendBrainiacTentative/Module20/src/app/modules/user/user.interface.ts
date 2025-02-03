import { Model } from 'mongoose';
export interface TUser {
  id: string;
  password: string;
  email: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
export interface newUser {
  id: string;
  role: string;
  password: string;
}

// Creating static methods for the User model in the User interface

export interface UserModel extends Model<TUser> {
  // Define any static methods here if needed
  isUserExist(id: string): Promise<boolean>;
  isUserBlocked(id: string): Promise<boolean>;
  isPasswordMatched(password: string, id: string): Promise<boolean>;
  isUserDeleted(id: string): Promise<boolean>;
  isJwtIssuedBeforePasswordChange(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}
