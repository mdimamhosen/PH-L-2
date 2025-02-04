import config from '../config';
import { USER_ROLE } from '../models/user/user.const';
import { User } from '../models/user/user.model';

const superUser = {
  id: '0001',
  email: 'mimam22.cse@buffer.ac.bd',
  password: config.superAdminPassword,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
  needsPasswordChange: false,
};

export const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};
