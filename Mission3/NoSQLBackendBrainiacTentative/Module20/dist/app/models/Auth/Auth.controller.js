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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const config_1 = __importDefault(require("../../config"));
const CatchResponse_1 = __importDefault(require("../../utils/CatchResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Auth_service_1 = require("./Auth.service");
const loginUer = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Auth_service_1.AuthServices.loginUser(req.body);
    console.log('result', result);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config_1.default.nodeEnv === 'production' ? true : false,
        // sameSite: 'none',
        // maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Login Successfully',
        statusCode: 200,
        success: true,
    });
}));
const changePassword = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    const result = yield Auth_service_1.AuthServices.changePassword(req.user, passwordData);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Password changed successfully',
        statusCode: 200,
        success: true,
    });
}));
const refreshToken = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield Auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Token refreshed successfully',
        statusCode: 200,
        success: true,
    });
}));
const forgotPassword = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const result = yield Auth_service_1.AuthServices.forgotPassword(id);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Password reset link sent to your email',
        statusCode: 200,
        success: true,
    });
}));
const resetPassword = (0, CatchResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newPassword } = req.body;
    const token = req.headers.authorization;
    const result = yield Auth_service_1.AuthServices.resetPassword(id, newPassword, token);
    (0, sendResponse_1.default)(res, {
        data: result,
        message: 'Password reset successfully',
        statusCode: 200,
        success: true,
    });
}));
exports.AuthController = {
    loginUer,
    changePassword,
    refreshToken,
    forgotPassword,
    resetPassword,
};
