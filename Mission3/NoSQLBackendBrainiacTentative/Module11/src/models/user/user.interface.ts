export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  isDeleted: boolean;
  status: string;
  created_at: Date;
  updated_at: Date;
}
