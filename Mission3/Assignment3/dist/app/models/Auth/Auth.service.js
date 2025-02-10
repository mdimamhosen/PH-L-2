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
exports.AuthService = void 0;
const configurations_1 = require("../../config/configurations");
const AppError_1 = require("../../utils/AppError");
const User_model_1 = require("../User/User.model");
const Auth_utils_1 = require("./Auth.utils");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!(yield User_model_1.User.isUserExist(email))) {
        throw new AppError_1.AppError('User not found', http_status_1.default.NOT_FOUND);
    }
    if (yield User_model_1.User.isUserDeleted(email)) {
        throw new AppError_1.AppError('User is deleted', http_status_1.default.BAD_REQUEST);
    }
    if (yield User_model_1.User.isUserBlocked(email)) {
        throw new AppError_1.AppError('User is blocked', http_status_1.default.BAD_REQUEST);
    }
    if (!(yield User_model_1.User.isPasswordMatched(password, email))) {
        throw new AppError_1.AppError('Password is incorrect', http_status_1.default.BAD_REQUEST);
    }
    const user = yield User_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError('User not found', http_status_1.default.NOT_FOUND);
    }
    // create token and send to the user
    const jwtPayload = {
        _id: user._id,
        id: user.id,
        role: user.role,
        email: user.email,
    };
    const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, configurations_1.configurations.jwtSecret, configurations_1.configurations.jwtExpiration);
    (0, Auth_utils_1.createToken)(jwtPayload, configurations_1.configurations.jwtRefreshSecret, configurations_1.configurations.jwtRefreshExpiration);
    return {
        token: accessToken,
        // refreshToken,
    };
});
exports.AuthService = {
    loginUser,
};
