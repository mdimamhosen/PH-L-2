export const USER_ROLE = {
  admin: 'admin',
  student: 'student',
  faculty: 'faculty',
  superAdmin: 'superAdmin',
} as const;

export type TUserRole = keyof typeof USER_ROLE;

export const UserStatus = ['active', 'inactive'] as const;
