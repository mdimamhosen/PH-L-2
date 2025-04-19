import { prisma } from '../../utils';

export const isUserExist = async (email: string) => {
  const isExis = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return isExis ? true : false;
};
