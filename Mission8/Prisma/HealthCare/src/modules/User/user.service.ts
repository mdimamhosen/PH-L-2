import {
  Doctor,
  Patient,
  PrismaClient,
  UserRole,
  UserStatus,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import { Admin, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

import { Request } from 'express';
import { IFile } from '../../interface/file';
import { pagination } from '../../utils';
import { IAuthUser } from '../../interface/common';
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

const createDoctor = async (req: Request): Promise<Doctor> => {
  // const file = req.file as IFile;

  // if (file) {
  //     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  //     req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
  // }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};

const createPatient = async (req: Request): Promise<Patient> => {
  // const file = req.file as IFile;

  // if (file) {
  //     const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
  //     req.body.patient.profilePhoto = uploadedProfileImage?.secure_url;
  // }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdPatientData = await transactionClient.patient.create({
      data: req.body.patient,
    });

    return createdPatientData;
  });

  return result;
};

const getAllFromDB = async (params: any, options: Record<string, unknown>) => {
  const { limit, page, skip } = pagination(options);

  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: ['email'].map(field => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.UserWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [String(options.sortBy)]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      Patient: true,
      Doctor: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyProfile = async (user: any) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
    },
  });

  let profileInfo;
  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }
};

const updateMyProfile = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
  });

  // const file = req.file as IFile;
  // if (file) {
  //     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  //     req.body.profilePhoto = uploadToCloudinary?.secure_url;
  // }

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }

  return { ...profileInfo };
};

export const UserService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  getMyProfile,
  updateMyProfile,
};
