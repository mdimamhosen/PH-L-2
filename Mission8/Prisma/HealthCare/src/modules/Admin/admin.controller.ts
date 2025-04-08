import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const getAllAdmins = catchAsyncResponse(async (req, res) => {
  // const result = await UserService.createAdmin(req.body);
  const result = await AdminService.getAllAdmins();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admins fetched successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
};
