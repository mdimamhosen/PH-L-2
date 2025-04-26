import { Request, Response } from 'express';
import { PatientService } from './patient.services';
import sendResponse from '../../utils/sendResponse';
import catchAsyncResponse from '../../utils/catchAsyncResponse';
import { pickQueries } from '../../utils/PickQueries';

const getAllFromDB = catchAsyncResponse(async (req: Request, res: Response) => {
  const filters = pickQueries(req.query, ['name, email']);
  const rawOptions = pickQueries(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);
  const options = {
    limit: parseInt(rawOptions.limit as string, 10) || 10,
    page: parseInt(rawOptions.page as string, 10) || 1,
    sortBy: rawOptions.sortBy as string | undefined,
    sortOrder: rawOptions.sortOrder as 'asc' | 'desc' | undefined,
  };

  const result = await PatientService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsyncResponse(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PatientService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Patient retrieval successfully',
      data: result,
    });
  },
);

const updateIntoDB = catchAsyncResponse(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PatientService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsyncResponse(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PatientService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient deleted successfully',
    data: result,
  });
});

const softDelete = catchAsyncResponse(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PatientService.softDelete(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient soft deleted successfully',
    data: result,
  });
});

export const PatientController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDelete,
};
