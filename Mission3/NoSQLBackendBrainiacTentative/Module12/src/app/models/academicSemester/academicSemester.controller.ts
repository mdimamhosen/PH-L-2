import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchResponse';
import { AcademicSemesterService } from './academicSemester.service';
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemester(req.body);
  const data = {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Academic semester is created successfully',
    data: result,
  };
  sendResponse(res, data);
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
