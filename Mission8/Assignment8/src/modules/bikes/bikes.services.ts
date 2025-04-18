import { Bike } from '@prisma/client';
import { prisma } from '../../utils';

const addBike = async (payload: Bike) => {
  const { brand, model, year, customerId } = payload;
  const bikeData = {
    brand,
    model,
    year,
    customerId,
  };

  const result = await prisma.bike.create({
    data: bikeData,
  });

  return result;
};

const getAllBikes = async () => {
  const result = await prisma.bike.findMany({
    where: {
      isDeleted: false,
    },
  });
  return result;
};

const getBikeById = async (id: string) => {
  const result = await prisma.bike.findUniqueOrThrow({
    where: {
      bikeId: id,
      isDeleted: false,
    },
  });
  return result;
};

const updateBike = async (id: string, payload: Bike) => {
  const isIDExists = await prisma.bike.findUniqueOrThrow({
    where: {
      bikeId: id,
    },
  });

  if (!isIDExists) throw new Error('Bike ID not found');

  const result = await prisma.bike.update({
    where: {
      bikeId: id,
    },
    data: payload,
  });

  return result;
};

export const BikeService = {
  addBike,
  getAllBikes,
  getBikeById,
  updateBike,
};
