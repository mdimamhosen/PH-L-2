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
    return admins;
});
exports.AdminService = {
    getAllAdmins,
};
