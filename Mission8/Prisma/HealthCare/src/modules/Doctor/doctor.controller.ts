import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { DoctorService } from './doctor.service';

const updateIntoDB = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor data updated!',
    data: {},
  });
});
export const DoctorController = {
  updateIntoDB,
};
