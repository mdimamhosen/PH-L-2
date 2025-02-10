import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './Auth.service';

const loginUser = catchAsyncResponse(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  console.log('result', result);

  sendResponse(res, {
    data: result,
    message: 'Login Successfully',
    statusCode: 200,
    success: true,
  });
});

export const AuthController = {
  loginUser,
};
