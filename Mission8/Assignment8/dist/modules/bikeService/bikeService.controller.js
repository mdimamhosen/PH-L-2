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
const bikeService_service_1 = require("./bikeService.service");
const addService = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikeService_service_1.BikeServices.addService(req.body);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to create service record',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service record created successfully',
        data: result,
    });
}));
const getAllServices = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikeService_service_1.BikeServices.getAllServices();
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to get service records',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service records retrieved successfully',
        data: result,
    });
}));
const getServiceById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bikeService_service_1.BikeServices.getServiceById(id);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to get service record',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service record retrieved successfully',
        data: result,
    });
}));
const updateService = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bikeService_service_1.BikeServices.updateService(id, req.body);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to update service record',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service record updated successfully',
        data: result,
    });
}));
const getByStatus = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bikeService_service_1.BikeServices.getByStatus();
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to get service records',
        });
        return;
    }
    console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service records retrieved successfully',
        data: result,
    });
}));
exports.BikeController = {
    addService,
    getAllServices,
    getServiceById,
    updateService,
    getByStatus,
};
