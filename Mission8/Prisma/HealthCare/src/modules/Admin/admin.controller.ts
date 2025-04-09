import catchAsyncResponse from '../../utils/catchAsyncResponse';
import { pickQueries } from '../../utils/PickQueries';
import sendResponse from '../../utils/sendResponse';
import { adminFilterableFields, adminPaginationFields } from './admin.constant';
import { AdminService } from './admin.service';

const getAllAdmins = catchAsyncResponse(async (req, res) => {
  const pickedObj = pickQueries(req.query, adminFilterableFields);
  const paginationObj = pickQueries(req.query, adminPaginationFields);
  const result = await AdminService.getAllAdmins(pickedObj, paginationObj);
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
