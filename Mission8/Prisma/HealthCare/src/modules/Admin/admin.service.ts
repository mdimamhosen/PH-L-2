import { Prisma } from '@prisma/client';
import { adminSearchAbleFields } from './admin.constant';
import { pagination } from '../../utils/PaginationBuilder';
import { prisma } from '../../utils';

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
  return admins;
};
export const AdminService = {
  getAllAdmins,
};
