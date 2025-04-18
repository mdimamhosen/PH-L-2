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
exports.BikeController = void 0;
const catchAsyncResponse_1 = __importDefault(require("../../utils/catchAsyncResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bikes_services_1 = require("./bikes.services");
const addBike = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikes_services_1.BikeService.addBike(req.body);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to create bike',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Bike created successfully',
        data: result,
    });
}));
const getAllBikes = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikes_services_1.BikeService.getAllBikes();
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to get bikes',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Bikes retrieved successfully',
        data: result,
    });
}));
const bikeById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bikes_services_1.BikeService.getBikeById(id);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to get bike',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Bike retrieved successfully',
        data: result,
    });
}));
const updateBike = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bikes_services_1.BikeService.updateBike(id, req.body);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to update bike',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Bike updated successfully',
        data: result,
    });
}));
exports.BikeController = {
    addBike,
    getAllBikes,
    bikeById,
    updateBike,
};
