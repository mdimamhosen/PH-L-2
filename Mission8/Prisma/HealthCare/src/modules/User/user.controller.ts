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

const createDoctor = catchAsyncResponse(async (req: Request, res: Response) => {
  UserService;
  const result = await UserService.createDoctor(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor Created successfuly!',
    data: result,
  });
});

const createPatient = catchAsyncResponse(
  async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Patient created successfully',
      data: result,
    });
  },
);

export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
};
