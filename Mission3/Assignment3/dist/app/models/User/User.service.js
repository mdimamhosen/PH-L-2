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
exports.UserServices = void 0;
const AppError_1 = require("../../utils/AppError");
const User_model_1 = require("./User.model");
const User_utils_1 = require("./User.utils");
const http_status_1 = __importDefault(require("http-status"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = {};
    UserData.role = 'admin';
    UserData.name = payload.name;
    UserData.email = payload.email;
    UserData.password = payload.password;
    UserData.id = yield (0, User_utils_1.genarateAdminId)();
    const newUser = yield User_model_1.User.create(UserData);
    if (!newUser) {
        throw new AppError_1.AppError('User is not created', http_status_1.default.BAD_REQUEST);
    }
    return newUser;
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = {};
    UserData.role = 'user';
    UserData.name = payload.name;
    UserData.email = payload.email;
    UserData.password = payload.password;
    UserData.id = yield (0, User_utils_1.genarateUserId)();
    const newUser = yield User_model_1.User.create(UserData);
    if (!newUser) {
        throw new AppError_1.AppError('User is not created', http_status_1.default.BAD_REQUEST);
    }
    return newUser;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.AppError('User not found', http_status_1.default.NOT_FOUND);
    }
    const updatedUser = yield User_model_1.User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    return updatedUser;
});
exports.UserServices = {
    createAdmin,
    createUser,
    blockUser,
};
