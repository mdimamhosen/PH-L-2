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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const admin_constant_1 = require("./admin.constant");
const PaginationBuilder_1 = require("../../utils/PaginationBuilder");
const utils_1 = require("../../utils");
const AppError_1 = require("../../utils/AppError");
const getAllAdmins = (params, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page } = (0, PaginationBuilder_1.pagination)(paginationOptions);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const conditions = [];
    const adminSerachFields = admin_constant_1.adminSearchAbleFields;
    if (params.searchTerm) {
        conditions.push({
            OR: adminSerachFields.map(field => ({
                [field]: { contains: params.searchTerm, mode: 'insensitive' },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        conditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    conditions.push({
        isDeleted: false,
    });
    const whereCondition = {
        AND: conditions.length > 0 ? conditions : undefined,
    };
    const admins = yield utils_1.prisma.admin.findMany({
        where: whereCondition,
        skip: Number(page) && Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0,
        take: Number(limit) && Number(limit) > 0 ? Number(limit) : 10,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? {
                [paginationOptions.sortBy]: paginationOptions.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            user: true,
        },
    });
    return {
        meta: {
            page,
            limit,
            total: admins.length,
            totalPages: Math.ceil(admins.length / limit),
        },
        data: admins,
    };
});
const getAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield utils_1.prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            user: true,
        },
    });
    return admin;
});
const updateAdminById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield utils_1.prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!isExist) {
        new AppError_1.AppError('Admin not found', 404);
    }
    const admin = yield utils_1.prisma.admin.update({
        where: {
            id,
        },
        data,
    });
    return admin;
});
const deleteAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield utils_1.prisma.admin.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (!isExist) {
        new AppError_1.AppError('Admin not found', 404);
    }
    // !> This is a soft delete, we need to update the isDeleted field to true
    const admin = yield utils_1.prisma.admin.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return admin;
    // !> But this is not a soft delete, this is a hard delete
    // !> So we need to delete the user as well, because the user is also deleted from the database
    // const admin = await prisma.$transaction(async tx => {
    //   const deletedAdmin = await tx.admin.delete({
    //     where: {
    //       id,
    //     },
    //     include: {
    //       user: true,
    //     },
    //   });
    //   await tx.user.delete({
    //     where: {
    //       email: deletedAdmin.email,
    //     },
    //   });
    //   return deletedAdmin;
    // });
    // return admin;
});
exports.AdminService = {
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
};
