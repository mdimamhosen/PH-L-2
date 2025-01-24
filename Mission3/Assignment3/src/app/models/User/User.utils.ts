import { User } from './User.model';

const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const genarateAdminId = async () => {
  let currentAdminId = (0).toString().padStart(4, '0');
  const lastAdminId = await findLastAdminId();
  console.log('last admin id', lastAdminId);

  if (lastAdminId) {
    currentAdminId = (Number(lastAdminId) + 1).toString().padStart(4, '0');
  } else {
    currentAdminId = (Number(currentAdminId) + 1).toString().padStart(4, '0');
  }
  const adminId = `A-${currentAdminId}`;
  return adminId;
};

genarateAdminId().then(res => console.log(res));
