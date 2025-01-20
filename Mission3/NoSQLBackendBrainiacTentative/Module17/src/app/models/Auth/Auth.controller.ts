import catchAsync from '../../utils/CatchResponse';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './Auth.service';

const loginUer = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    data: result,
    message: 'Login Successfully',
    statusCode: 200,
    success: true,
  });
});

export const AuthController = {
  loginUer,
};
