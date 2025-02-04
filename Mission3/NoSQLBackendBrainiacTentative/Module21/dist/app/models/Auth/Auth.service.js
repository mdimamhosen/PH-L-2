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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../utils/AppError");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Auth_utils_1 = require("./Auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    const { id, password } = payload;
    if (!(yield user_model_1.User.isUserExist(id))) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (yield user_model_1.User.isUserDeleted(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is deleted');
    }
    if (yield user_model_1.User.isUserBlocked(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is blocked');
    }
    if (!(yield user_model_1.User.isPasswordMatched(password, id))) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Password is incorrect');
    }
    const user = yield user_model_1.User.findOne({ id });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // create token and send to the user
    const jwtPayload = {
        id: user.id,
        role: user.role,
    };
    const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, config_1.default.jwtExpiration);
    const refreshToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwtRefreshSecret, config_1.default.jwtRefreshExpiration);
    return {
        accessToken,
        needsPasswordChange: user.needsPasswordChange,
        refreshToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    const { oldPassword, newPassword } = payload;
    if (!(yield user_model_1.User.isUserExist(id))) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (yield user_model_1.User.isUserDeleted(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is deleted');
    }
    if (!(yield user_model_1.User.isPasswordMatched(oldPassword, id))) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Old password is incorrect');
    }
    if (yield user_model_1.User.isUserBlocked(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is blocked');
    }
    console.log({
        newPassword,
        oldPassword,
    });
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(10));
    yield user_model_1.User.findOneAndUpdate({
        id,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    }, { new: true, upsert: true });
    return null;
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, Auth_utils_1.verifyToken)(refreshToken, config_1.default.jwtRefreshSecret);
    const id = decoded.id;
    const user = yield user_model_1.User.findOne({ id });
    const iat = decoded.iat;
    // check if user exist
    if (!(yield user_model_1.User.isUserExist(id))) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // check if user is deleted
    if (yield user_model_1.User.isUserDeleted(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is deleted');
    }
    // check if user is blocked
    if (yield user_model_1.User.isUserBlocked(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is blocked');
    }
    // check if password is changed after the token is issued
    if ((user === null || user === void 0 ? void 0 : user.passwordChangedAt) &&
        user_model_1.User.isJwtIssuedBeforePasswordChange(user.passwordChangedAt, iat)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Password is changed, please login again');
    }
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const jwtPayload = {
        id: user.id,
        role: user.role,
    };
    const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, config_1.default.jwtExpiration);
    return {
        accessToken,
    };
});
const forgotPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExist(id))) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (yield user_model_1.User.isUserDeleted(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is deleted');
    }
    if (yield user_model_1.User.isUserBlocked(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is blocked');
    }
    const user = yield user_model_1.User.findOne({ id });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const jwtPayload = {
        id: user.id,
        role: user.role,
    };
    const resetToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, '10m');
    const resetLink = `${config_1.default.resetUiUrl}?id=${id}&token=${resetToken}`;
    console.log(resetLink);
    (0, sendEmail_1.sendEmail)(user.email, 'Reset Password', resetLink);
    // return {
    //   accessToken,
    // };
});
const resetPassword = (id, newPassword, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExist(id))) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (yield user_model_1.User.isUserDeleted(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is deleted');
    }
    if (yield user_model_1.User.isUserBlocked(id)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is blocked');
    }
    const user = yield user_model_1.User.findOne({ id });
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
    if (decoded.id !== id) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Token is invalid');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(10));
    yield user_model_1.User.findOneAndUpdate({
        id,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    }, { new: true, upsert: true });
    (0, sendEmail_1.sendEmail)(user.email, 'Password Changed', 'Password changed successfully');
    return null;
});
exports.AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgotPassword,
    resetPassword,
};
