import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './User.service';
import httpStatus from 'http-status';

const createAdmin = catchAsyncResponse(async (req, res) => {
  console.log(req.body);

  const result = await UserServices.createAdmin(req.body);
  const data = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Admin created successfully',
    data: result,
  };
  sendResponse(res, data);
});

const createUser = catchAsyncResponse(async (req, res) => {
  const result = await UserServices.createUser(req.body);

  const data = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
  };

  sendResponse(res, data);
});

const blockUser = catchAsyncResponse(async (req, res) => {
  const { userId } = req.params;
  console.log('userId', userId);
  await UserServices.blockUser(userId);

  const data = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User blocked successfully',
    // data: {},
  };

  sendResponse(res, data);
});

export const UserController = {
  createAdmin,
  createUser,
  blockUser,
};
