"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const ZodError_1 = require("../errors/ZodError");
const MongooseError_1 = require("../errors/MongooseError");
const CastError_1 = require("../errors/CastError");
const DuplicateError_1 = require("../errors/DuplicateError");
const AppError_1 = require("../utils/AppError");
const globalErrorHandler = (error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal server error';
    let errorSource = [
        {
            path: error.path || 'unknown',
            message: error.message || 'Something went wrong',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, ZodError_1.ZodErrorHandler)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, MongooseError_1.MongooseErrorHandler)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, CastError_1.handleCastError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        const simplifiedError = (0, DuplicateError_1.handleDuplicateError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources;
    }
    else if (error instanceof AppError_1.AppError) {
        console.log('AppError', error);
        statusCode = error.statusCode;
        message = error.message;
        errorSource = [
            {
                path: '',
                message: error.message || 'Something went wrong',
            },
        ];
    }
    else if (error instanceof Error) {
        statusCode = 500;
        const errorMessage = error === null || error === void 0 ? void 0 : error.message.replace(/^Error:\s*/, '');
        message = errorMessage || 'Internal server  error';
        errorSource = [
            {
                path: '',
                message: errorMessage || 'Something went wrong',
            },
        ];
    }
    res.status(statusCode).json({
        message,
        success: false,
        errorSource,
        stack: config_1.default.nodeEnv === 'development' ? error.stack : null,
    });
};
exports.default = globalErrorHandler;
