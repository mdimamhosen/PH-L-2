"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsyncResponse_1 = __importDefault(require("../../utils/catchAsyncResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Simulate a successful login response
    const result = yield auth_service_1.AuthService.loginUser({
        email,
        password,
    });
    const { accessToken, refreshToken, needPasswordChange } = result;
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: config_1.default.env === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 * 7, // 30 days
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User login successfully!',
        data: {
            accessToken,
            needPasswordChange,
        },
    });
}));
const refreshToken = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        (0, sendResponse_1.default)(res, {
            statusCode: 401,
            success: false,
            message: 'You are not authorized!',
        });
        return;
    }
    const result = yield auth_service_1.AuthService.refreshToken(refreshToken);
    const { accessToken } = result;
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: config_1.default.env === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 * 7, // 30 days
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'New access token generated successfully!',
        data: {
            accessToken,
        },
    });
    // Add further logic here if needed
}));
const changePassword = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const user = req.user; // Assuming you have user info in req.user after authentication
    const result = yield auth_service_1.AuthService.changePassword(user, {
        oldPassword,
        newPassword,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully!',
        data: result,
    });
}));
exports.AuthController = {
    loginUser,
    refreshToken,
};
