import config from '../../config';
import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsyncResponse(async (req, res) => {
  const { email, password } = req.body;
  // Simulate a successful login response
  const result = await AuthService.loginUser({
    email,
    password,
  });

  const { accessToken, refreshToken, needPasswordChange } = result;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 * 7, // 30 days
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully!',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const refreshToken = catchAsyncResponse(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'You are not authorized!',
    });
    return;
  }
  const result = await AuthService.refreshToken(refreshToken);
  const { accessToken } = result;
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 * 7, // 30 days
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'New access token generated successfully!',
    data: {
      accessToken,
    },
  });

  // Add further logic here if needed
});

const changePassword = catchAsyncResponse(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user; // Assuming you have user info in req.user after authentication
  const result = await AuthService.changePassword(user, {
    oldPassword,
    newPassword,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully!',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
