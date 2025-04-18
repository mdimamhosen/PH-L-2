import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { BikeService } from './bikes.services';

const addBike = catchAsyncResponse(async (req, res) => {
  const result = await BikeService.addBike(req.body);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to create bike',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike created successfully',
    data: result,
  });
});

const getAllBikes = catchAsyncResponse(async (req, res) => {
  const result = await BikeService.getAllBikes();
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to get bikes',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const bikeById = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await BikeService.getBikeById(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to get bike',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await BikeService.updateBike(id, req.body);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to update bike',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

export const BikeController = {
  addBike,
  getAllBikes,
  bikeById,
  updateBike,
};
