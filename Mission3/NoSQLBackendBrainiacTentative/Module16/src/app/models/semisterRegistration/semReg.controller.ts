import catchAsync from '../../utils/CatchResponse';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SemesterRegistrationService } from './semReg.services';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const resutl = await SemesterRegistrationService.createSemesterRegistration(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Semester Registration Created Successfully',
    data: resutl,
    success: true,
  });
});

const getAllRegisteredSemester = catchAsync(async (req, res) => {});

const getSingleRegisteredSemester = catchAsync(async (req, res) => {});

const updateRegisteredSemistered = catchAsync(async (req, res) => {});

const deleteRegisteredSemester = catchAsync(async (req, res) => {});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllRegisteredSemester,
  getSingleRegisteredSemester,
  updateRegisteredSemistered,
  deleteRegisteredSemester,
};
