import catchAsync from '../../utils/CatchResponse';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getSingleFaculty,
};
