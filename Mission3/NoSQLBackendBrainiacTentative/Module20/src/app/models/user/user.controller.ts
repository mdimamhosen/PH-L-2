import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const file = req.file;
  const result = await UserServices.createStudentIntoDB(
    password,
    student,
    file,
  );
  const data = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Student created successfully',
    data: result,
  };
  sendResponse(res, data);
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  const data = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Faculty created successfully',
    data: result,
  };
  sendResponse(res, data);
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(password, adminData);
  const data = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Admin created successfully',
    data: result,
  };
  sendResponse(res, data);
});

const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMe(req.user);
  const data = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User data',
    data: result,
  };
  sendResponse(res, data);
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.changeStatus(id, req.body);
  const data = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Status changed successfully',
    data: result,
  };
  sendResponse(res, data);
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
