import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsyncResponse from '../../utils/catchAsyncResponse';
import { ScheduleService } from './schedule.service';
const inserIntoDB = catchAsyncResponse(async (req, res) => {
  const result = await ScheduleService.inserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule created successfully!',
    data: result,
  });
});

export const ScheduleController = {
  inserIntoDB,
};
