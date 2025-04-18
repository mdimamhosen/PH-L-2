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
exports.CustomerController = void 0;
const catchAsyncResponse_1 = __importDefault(require("../../utils/catchAsyncResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const customers_service_1 = require("./customers.service");
const createCustomer = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customers_service_1.CustomerService.createCustomer(req.body);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to create customer',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Customer created successfully',
        data: result,
    });
}));
const getAllCustomers = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customers_service_1.CustomerService.getAllCustomers();
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to get customers',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Customers retrieved successfully',
        data: result,
    });
}));
const getCustomerById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customers_service_1.CustomerService.getCustomerById(id);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to get customer',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Customer retrieved successfully',
        data: result,
    });
}));
const updateCustomer = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customers_service_1.CustomerService.updateCustomer(id, req.body);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to update customer',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Customer updated successfully',
        data: result,
    });
}));
const deleteCustomer = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customers_service_1.CustomerService.deleteCustomer(id);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Failed to delete customer',
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Customer deleted successfully',
        data: result,
    });
}));
exports.CustomerController = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
