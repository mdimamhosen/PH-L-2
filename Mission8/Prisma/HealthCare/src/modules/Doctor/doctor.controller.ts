import catchAsyncResponse from '../../utils/catchAsyncResponse';

import { pickQueries } from '../../utils/PickQueries';
import sendResponse from '../../utils/sendResponse';
import { DoctorService } from './doctor.service';

const updateIntoDB = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor data updated!',
    data: {},
  });
});

const getAllFromDB = catchAsyncResponse(async (req, res) => {
  const filters = pickQueries(req.query, ['email', 'name', 'phoneNumber']);
  const rawOptions = pickQueries(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);
  const options = {
    limit: parseInt(rawOptions.limit as string, 10) || 10,
    page: parseInt(rawOptions.page as string, 10) || 1,
    skip:
      ((parseInt(rawOptions.page as string, 10) || 1) - 1) *
      (parseInt(rawOptions.limit as string, 10) || 10),
    sortBy: rawOptions.sortBy as string | undefined,
    sortOrder: rawOptions.sortOrder as 'asc' | 'desc' | undefined,
  };
  const result = await DoctorService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctors retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor retrieval successfully',
    data: result,
  });
});

const deleteFromDB = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor deleted successfully',
    data: result,
  });
});

const softDelete = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.softDelete(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor soft deleted successfully',
    data: result,
  });
});

export const DoctorController = {
  updateIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
  softDelete,
  // getDoctorById,
};
