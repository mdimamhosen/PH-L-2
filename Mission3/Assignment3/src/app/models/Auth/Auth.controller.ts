import { configurations } from '../../config/configurations';
import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './Auth.service';

const loginUser = catchAsyncResponse(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  console.log('result', result);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: configurations.nodeEnv === 'production' ? true : false,
    // sameSite: 'none',
    // maxAge: 1000 * 60 * 60 * 24 * 30,
  });

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
