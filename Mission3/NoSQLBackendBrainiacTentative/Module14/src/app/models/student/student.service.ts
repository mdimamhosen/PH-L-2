/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import mongoose from 'mongoose';

import { TStudent } from './student.interface';
import { Student } from './student.model';
import { AppError } from '../../utils/AppError';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const searchField = [
    'name.firstName',
    'name.lastName',
    'id',
    'email',
    'phone',
    'address',
  ];

  const skipedFields = [
    'limit',
    'page',
    'searchTerm',
    'sort',
    'select',
    'fields',
  ];

  const queryObject = { ...query };

  skipedFields.forEach(field => {
    if (queryObject[field]) {
      delete queryObject[field];
    }
  });

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: searchField.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const filterQuery = searchQuery
    .find(queryObject)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';

  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let skip = 0;
  let limit = 1;

  if (query?.limit) {
    limit = parseInt(query.limit as string, 10);
  }

  if (query?.page) {
    page = parseInt(query.page as string, 10);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  // Field limiting Query

  // Like select query in mongoose we can use select query to get only required fields from database. It is also called field limiting. like we have a document with 10 fields but we only want 5 fields to be returned from the database. We can use select query to get only required fields. It is also called field limiting. Example is given below.
  // There are 10 field like name, email , phone, address etc in the document but we only want name and email to be returned from the database. We can use select query to get only required fields. Example is given below.
  // const result = await Student.find().select('name email');
  // It will return only name and email fields from the database.

  let fields = '-__v';

  if (query?.fields) {
    fields = query.fields as string;
  }
  fields = fields.split(',').join(' ');
  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
