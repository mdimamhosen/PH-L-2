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
exports.AdminController = void 0;
const catchAsyncResponse_1 = __importDefault(require("../../utils/catchAsyncResponse"));
const PickQueries_1 = require("../../utils/PickQueries");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_constant_1 = require("./admin.constant");
const admin_service_1 = require("./admin.service");
const getAllAdmins = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pickedObj = (0, PickQueries_1.pickQueries)(req.query, admin_constant_1.adminFilterableFields);
    const paginationObj = (0, PickQueries_1.pickQueries)(req.query, admin_constant_1.adminPaginationFields);
    const result = yield admin_service_1.AdminService.getAllAdmins(pickedObj, paginationObj);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admins fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getAdminById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.getAdminById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin fetched successfully',
        data: result,
    });
}));
const updateAdminById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.updateAdminById(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin updated successfully',
        data: result,
    });
}));
const deleteAdminById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.deleteAdminById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin deleted successfully',
        data: result,
    });
}));
exports.AdminController = {
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
};
