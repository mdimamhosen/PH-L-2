import { Model } from 'mongoose';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: TRoles;
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TRoles = 'admin' | 'user';

export interface UserModel extends Model<IUser> {
  isUserBlocked(id: string): Promise<boolean>;
  isUserExist(id: string): Promise<boolean>;
  isPasswordMatched(id: string, password: string): Promise<boolean>;
  isUserDeleted(id: string): Promise<boolean>;
  isJwtIssuedBeforePasswordChange(
    passwordChangeTime: Date,
    jwtIssuedTime: number,
  ): boolean;
}
