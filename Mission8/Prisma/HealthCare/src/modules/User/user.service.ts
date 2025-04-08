import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const { password, body } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const name = body.name;
  const email = body.email;
  const contactNumber = body.contactNumber;

  const userData = {
    email: email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const adminData = {
    name: name,
    contactNumber: contactNumber,
    email: email,
  };

  const result = await prisma.$transaction(async tx => {
    const user = await tx.user.create({
      data: userData,
    });

    const admin = await tx.admin.create({
      data: {
        ...adminData,
      },
    });

    return { user, admin };
  });

  return result;
};

export const UserService = {
  createAdmin,
};
