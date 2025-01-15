import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchResponse';
import { UserServices } from './user.service';
const createStudent = catchAsync(async (req, res) => {
  const { student, password } = req.body;
  const result = await UserServices.createStudentIntoDB(password, student);
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

const createAdmin = catchAsync(async () => {});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
