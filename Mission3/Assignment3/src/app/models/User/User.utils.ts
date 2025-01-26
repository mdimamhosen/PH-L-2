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

  if (lastAdminId) {
    currentAdminId = (Number(lastAdminId) + 1).toString().padStart(4, '0');
  } else {
    currentAdminId = (Number(currentAdminId) + 1).toString().padStart(4, '0');
  }
  const adminId = `A-${currentAdminId}`;
  return adminId;
};

const findLastUserId = async () => {
  const lastUser = await User.findOne(
    {
      role: 'user',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id ? lastUser.id.substring(2) : undefined;
};

export const genarateUserId = async () => {
  let currentUserId = (0).toString().padStart(4, '0');
  const lastUserId = await findLastUserId();
  console.log('last user id', lastUserId);

  if (lastUserId) {
    currentUserId = (Number(lastUserId) + 1).toString().padStart(4, '0');
  } else {
    currentUserId = (Number(currentUserId) + 1).toString().padStart(4, '0');
  }
  const userId = `U-${currentUserId}`;
  return userId;
};

export const UserUtils = {
  genarateAdminId,
  genarateUserId,
};
