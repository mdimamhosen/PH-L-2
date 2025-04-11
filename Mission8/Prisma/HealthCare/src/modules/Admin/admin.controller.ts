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
    meta: result.meta,
    data: result.data,
  });
});
const getAdminById = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.getAdminById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});
const updateAdminById = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.updateAdminById(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdminById = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdminById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
