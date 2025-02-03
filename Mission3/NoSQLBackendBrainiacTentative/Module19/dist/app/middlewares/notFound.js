"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req, res, next) => {
    res.status(400).json({
        message: 'Route not found',
        success: false,
        error: '',
    });
};
exports.default = notFound;
