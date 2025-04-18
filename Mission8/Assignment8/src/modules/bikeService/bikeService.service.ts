import { ServiceRecord } from '@prisma/client';
import { prisma } from '../../utils';
import { AppError } from '../../utils/AppError';

const addService = async (payload: ServiceRecord) => {
  const serviceData = {
    bikeId: payload.bikeId,
    serviceDate: payload.serviceDate,
    description: payload.description,
    status: payload.status,
  };

  const result = await prisma.serviceRecord.create({
    data: serviceData,
  });

  return result;
};

const getAllServices = async () => {
  const result = await prisma.serviceRecord.findMany({
    include: {
      bike: true,
    },
  });

  return result;
};
const getServiceById = async (id: string) => {
  const result = prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
    include: {
      bike: true,
    },
  });

  return result;
};

const updateService = async (id: string, payload: Partial<ServiceRecord>) => {
  const isIDExists = await prisma.serviceRecord.findUniqueOrThrow({
    where: {
      serviceId: id,
    },
  });

  if (!isIDExists) throw new AppError('Service ID not found', 404);

  const { completionDate } = payload;

  if (completionDate && completionDate !== null) {
    payload.completionDate = new Date(completionDate);
    payload.status = 'done';
  }
  const result = prisma.serviceRecord.update({
    where: {
      serviceId: id,
    },
    data: payload,

    include: {
      bike: true,
    },
  });

  return result;
};

const getByStatus = async () => {
  console.log('getByStatus called');
  const result = await prisma.serviceRecord.findMany({
    where: {
      AND: [
        {
          OR: [{ status: 'pending' }, { status: 'in_progress' }],
        },
        {
          serviceDate: {
            lt: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      ],
    },
    include: {
      bike: true,
    },
  });

  console.log(result);

  return result;
};

export const BikeServices = {
  addService,
  getAllServices,
  getServiceById,
  updateService,
  getByStatus,
};
