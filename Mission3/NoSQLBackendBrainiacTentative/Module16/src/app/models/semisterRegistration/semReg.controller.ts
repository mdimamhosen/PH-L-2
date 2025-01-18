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

const getAllRegisteredSemester = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.getAllRegistrateredSemesters(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All registered semesters',
    data: result,
    success: true,
  });
});

const getSingleRegisteredSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSemesterRegistrationById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Single registered semester',
    data: result,
    success: true,
  });
});

const updateRegisteredSemistered = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.updateSemesterRegistration(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Semester Registration Updated Successfully',
    data: result,
    success: true,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllRegisteredSemester,
  getSingleRegisteredSemester,
  updateRegisteredSemistered,
};
