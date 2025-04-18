"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    return res.status(data.statusCode).json({
        messsage: data.message,
        success: data.success,
        data: data.data,
        statusCode: data.statusCode,
        meta: data.meta,
        error: data.error,
        errorMessage: data.errorMessage,
        errorName: data.errorName,
        errorStack: data.errorStack,
        errorCode: data.errorCode,
        errorStatusCode: data.errorStatusCode,
        errorData: data.errorData,
    });
};
exports.default = sendResponse;
