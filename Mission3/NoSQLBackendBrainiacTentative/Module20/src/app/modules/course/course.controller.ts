import catchAsync from '../../utils/CatchResponse';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourse(req.body);

  const data = {
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    success: true,
    data: result,
  };
  sendResponse(res, data);
});

const getAllCourses = catchAsync(async (req, res) => {
  const courses = await CourseServices.getAllCoursesFromDB(req.query);

  const data = {
    statusCode: httpStatus.OK,
    message: 'Courses fetched successfully',
    success: true,
    data: courses,
  };
  sendResponse(res, data);
});

const getCourseById = catchAsync(async (req, res) => {
  const course = await CourseServices.getCourseByIdFromDB(req?.params?.id);

  const data = {
    statusCode: httpStatus.OK,
    message: 'Course fetched successfully',
    success: true,
    data: course,
  };
  sendResponse(res, data);
});

const updateCourse = catchAsync(async (req, res) => {
  const updatedCourse = await CourseServices.updateCourseIntoDB(
    req?.params?.id,
    req.body,
  );

  const data = {
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    success: true,
    data: updatedCourse,
  };
  sendResponse(res, data);
});

const deleteCourse = catchAsync(async (req, res) => {
  const course = await CourseServices.deleteCourseFromDB(req?.params?.id);

  const data = {
    statusCode: httpStatus.OK,
    message: 'Course deleted successfully',
    success: true,
    data: course,
  };
  sendResponse(res, data);
});

const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  const data = {
    statusCode: httpStatus.OK,
    message: 'Faculties assigned successfully',
    success: true,
    data: result,
  };

  sendResponse(res, data);
});

const removeFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseIntoDB(
    courseId,
    faculties,
  );
  const data = {
    statusCode: httpStatus.OK,
    message: 'Faculties removed successfully',
    success: true,
    data: result,
  };

  sendResponse(res, data);
});

export const courseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  assignFaculties,
  removeFaculties,
};
