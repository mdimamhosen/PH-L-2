import catchAsync from '../../utils/CatchResponse';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created successfully !',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Courses are fetched successfully !',
    data: result,
  });
});

const getOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is fetched successfully !',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is updated successfully !',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.deleteOfferedCourseFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is deleted successfully !',
    data: result,
  });
});

const getMyOfferedCourses = catchAsync(async (req, res) => {
  const id = req.user.id;

  const courses = await OfferedCourseServices.getMyOfferedCoursesFromDB(id);

  const data = {
    statusCode: httpStatus.OK,
    message: 'Courses fetched successfully',
    success: true,
    data: courses,
  };
  sendResponse(res, data);
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
  getMyOfferedCourses,
};
