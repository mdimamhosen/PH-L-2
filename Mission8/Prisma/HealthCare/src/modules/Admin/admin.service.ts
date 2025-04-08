import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getAllAdmins = async () => {
  const admins = await prisma.user.findMany({
    include: {
      admin: true,
    },
    where: {
      role: 'ADMIN',
    },
  });
  return admins;
};
export const AdminService = {
  getAllAdmins,
};
