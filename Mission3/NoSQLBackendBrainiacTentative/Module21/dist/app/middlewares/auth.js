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
const CatchResponse_1 = __importDefault(require("../utils/CatchResponse"));
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../models/user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const auth = (...roles) => {
    return (0, CatchResponse_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.AppError(401, 'Unauthorized token');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const role = decoded.role;
        const id = decoded.id;
        const user = yield user_model_1.User.findOne({ id });
        const iat = decoded.iat;
        // check if user exist
        if (!(yield user_model_1.User.isUserExist(id))) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, `${user === null || user === void 0 ? void 0 : user.role} not found`);
        }
        // check if user is deleted
        if (yield user_model_1.User.isUserDeleted(id)) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, `${user === null || user === void 0 ? void 0 : user.role} is deleted`);
        }
        // check if user is blocked
        if (yield user_model_1.User.isUserBlocked(id)) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, `${user === null || user === void 0 ? void 0 : user.role} is blocked`);
        }
        // check if password is changed after the token is issued
        if ((user === null || user === void 0 ? void 0 : user.passwordChangedAt) &&
            user_model_1.User.isJwtIssuedBeforePasswordChange(user.passwordChangedAt, iat)) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, `${user.role} password is changed. Please login again`);
        }
        // check if password is correct
        if (roles && !roles.includes(role)) {
            throw new AppError_1.AppError(403, `You don't have permission to perform this action`);
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
