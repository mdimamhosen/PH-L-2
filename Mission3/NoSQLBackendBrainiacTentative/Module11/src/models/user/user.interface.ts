export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  isDeleted: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  created_at: Date;
  updated_at: Date;
}

export type newUser = {
  id: string;
  role: string;
  password: string;
};
