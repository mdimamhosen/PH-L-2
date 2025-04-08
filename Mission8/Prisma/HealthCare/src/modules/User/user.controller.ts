import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';

const createAdmin = catchAsyncResponse(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
