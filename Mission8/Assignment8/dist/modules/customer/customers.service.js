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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const utils_1 = require("../../utils");
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = payload;
    const UserData = {
        name,
        email,
        phone,
    };
    const result = yield utils_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const customer = yield prisma.user.create({
            data: UserData,
        });
        return customer;
    }));
    return result;
});
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield utils_1.prisma.user.findMany();
    return customers;
});
const getCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield utils_1.prisma.user.findUnique({
        where: {
            customerId: id,
        },
    });
    return customer;
});
const updateCustomer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield utils_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const customer = yield prisma.user.update({
            where: {
                customerId: id,
            },
            data: payload,
        });
        return customer;
    }));
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isIDExists = yield utils_1.prisma.user.findUniqueOrThrow({
        where: {
            customerId: id,
        },
    });
    if (!isIDExists)
        throw new Error('Customer ID not found');
    const result = yield utils_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const customer = yield prisma.user.update({
            where: {
                customerId: id,
            },
            data: {
                isDeleted: true,
            },
        });
        return customer;
    }));
    return result;
});
exports.CustomerService = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
