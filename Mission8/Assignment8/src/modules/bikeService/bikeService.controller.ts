import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { BikeService } from '../bikes/bikes.services';
import { BikeServices } from './bikeService.service';

const addService = catchAsyncResponse(async (req, res) => {
  const result = await BikeServices.addService(req.body);

  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to create service record',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service record created successfully',
    data: result,
  });
});

const getAllServices = catchAsyncResponse(async (req, res) => {
  const result = await BikeServices.getAllServices();
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to get service records',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service records retrieved successfully',
    data: result,
  });
});

const getServiceById = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.getServiceById(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to get service record',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service record retrieved successfully',
    data: result,
  });
});

const updateService = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.updateService(id, req.body);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to update service record',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service record updated successfully',
    data: result,
  });
});

const getByStatus = catchAsyncResponse(async (req, res) => {
  const result = await BikeServices.getByStatus();
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to get service records',
    });
    return;
  }
  console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service records retrieved successfully',
    data: result,
  });
});
export const BikeController = {
  addService,
  getAllServices,
  getServiceById,
  updateService,
  getByStatus,
};
