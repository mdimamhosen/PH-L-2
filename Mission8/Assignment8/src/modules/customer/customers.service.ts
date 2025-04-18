import { User } from '@prisma/client';
import { prisma } from '../../utils';

const createCustomer = async (payload: User) => {
  const { name, email, phone } = payload;

  const UserData = {
    name,
    email,
    phone,
  };

  const result = await prisma.$transaction(async prisma => {
    const customer = await prisma.user.create({
      data: UserData,
    });
    return customer;
  });
  return result;
};

const getAllCustomers = async () => {
  const customers = await prisma.user.findMany();
  return customers;
};

const getCustomerById = async (id: string) => {
  const customer = await prisma.user.findUnique({
    where: {
      customerId: id,
    },
  });
  return customer;
};

const updateCustomer = async (id: string, payload: Partial<User>) => {
  const result = await prisma.$transaction(async prisma => {
    const customer = await prisma.user.update({
      where: {
        customerId: id,
      },
      data: payload,
    });
    return customer;
  });
  return result;
};

const deleteCustomer = async (id: string) => {
  const isIDExists = await prisma.user.findUniqueOrThrow({
    where: {
      customerId: id,
    },
  });

  if (!isIDExists) throw new Error('Customer ID not found');

  const result = await prisma.$transaction(async prisma => {
    const customer = await prisma.user.update({
      where: {
        customerId: id,
      },
      data: {
        isDeleted: true,
      },
    });
    return customer;
  });
  return result;
};

export const CustomerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
