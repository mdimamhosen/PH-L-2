import config from '../../config';
import catchAsync from '../../utils/CatchResponse';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './Auth.service';

const loginUer = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  console.log('result', result);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === 'production' ? true : false,
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

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    data: result,
    message: 'Password changed successfully',
    statusCode: 200,
    success: true,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    data: result,
    message: 'Token refreshed successfully',
    statusCode: 200,
    success: true,
  });
});

export const AuthController = {
  loginUer,
  changePassword,
  refreshToken,
};
