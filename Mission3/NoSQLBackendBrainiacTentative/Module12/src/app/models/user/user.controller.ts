import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchResponse';
const createStudent = catchAsync(async (req, res) => {
  const { student, password } = req.body;
  const result = await UserService.createStudent(student, password);
  const data = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Student created successfully',
    data: result,
  };
  sendResponse(res, data);
});

export const UserController = {
  createStudent,
};
