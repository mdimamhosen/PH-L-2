import { Prisma } from '@prisma/client';
import { adminSearchAbleFields } from './admin.constant';
import { pagination } from '../../utils/PaginationBuilder';
import { prisma } from '../../utils';
import { AppError } from '../../utils/AppError';

const getAllAdmins = async (
  params: Record<string, unknown>,
  paginationOptions: Record<string, unknown>,
) => {
  const { limit, page } = pagination(paginationOptions);

  const { searchTerm, ...filterData } = params;
  const conditions: Prisma.AdminWhereInput[] = [];

  const adminSerachFields: string[] = adminSearchAbleFields;

  if (params.searchTerm) {
    conditions.push({
      OR: adminSerachFields.map(field => ({
        [field]: { contains: params.searchTerm as string, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  conditions.push({
    isDeleted: false,
  });

  const whereCondition: Prisma.AdminWhereInput = {
    AND: conditions.length > 0 ? conditions : undefined,
  };

  const admins = await prisma.admin.findMany({
    where: whereCondition,
    skip:
      Number(page) && Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0,
    take: Number(limit) && Number(limit) > 0 ? Number(limit) : 10,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy as string]: paginationOptions.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      user: true,
    },
  });
  return {
    meta: {
      page,
      limit,
      total: admins.length,
      totalPages: Math.ceil(admins.length / limit),
    },
    data: admins,
  };
};

const getAdminById = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      user: true,
    },
  });

  return admin;
};

const updateAdminById = async (id: string, data: Prisma.AdminUpdateInput) => {
  const isExist = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!isExist) {
    new AppError('Admin not found', 404);
  }
  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return admin;
};
const deleteAdminById = async (id: string) => {
  const isExist = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (!isExist) {
    new AppError('Admin not found', 404);
  }
  // !> This is a soft delete, we need to update the isDeleted field to true
  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return admin;
  // !> But this is not a soft delete, this is a hard delete
  // !> So we need to delete the user as well, because the user is also deleted from the database
  // const admin = await prisma.$transaction(async tx => {
  //   const deletedAdmin = await tx.admin.delete({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });
  //   await tx.user.delete({
  //     where: {
  //       email: deletedAdmin.email,
  //     },
  //   });
  //   return deletedAdmin;
  // });
  // return admin;
};

export const AdminService = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
