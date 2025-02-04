import catchAsync from '../../utils/CatchResponse';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseService } from './EnrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await EnrolledCourseService.createEnrolledCourse(id, req.body);

  const data = {
    success: true,
    data: result,
    message: 'EnrolledCourse created successfully',
    statusCode: httpStatus.CREATED,
  };

  sendResponse(res, data);
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyID = req.user.id;
  const result = await EnrolledCourseService.updateEnrolledCourseMarks(
    facultyID,
    req.body,
  );

  const data = {
    success: true,
    data: result,
    message: 'EnrolledCourse marks updated successfully',
    statusCode: httpStatus.OK,
  };

  sendResponse(res, data);
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
