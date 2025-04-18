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
exports.BikeServices = void 0;
const utils_1 = require("../../utils");
const AppError_1 = require("../../utils/AppError");
const addService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = {
        bikeId: payload.bikeId,
        serviceDate: payload.serviceDate,
        description: payload.description,
        status: payload.status,
    };
    const result = yield utils_1.prisma.serviceRecord.create({
        data: serviceData,
    });
    return result;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield utils_1.prisma.serviceRecord.findMany({
        include: {
            bike: true,
        },
    });
    return result;
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = utils_1.prisma.serviceRecord.findUnique({
        where: {
            serviceId: id,
        },
        include: {
            bike: true,
        },
    });
    return result;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isIDExists = yield utils_1.prisma.serviceRecord.findUniqueOrThrow({
        where: {
            serviceId: id,
        },
    });
    if (!isIDExists)
        throw new AppError_1.AppError('Service ID not found', 404);
    const { completionDate } = payload;
    if (completionDate && completionDate !== null) {
        payload.completionDate = new Date(completionDate);
        payload.status = 'done';
    }
    const result = utils_1.prisma.serviceRecord.update({
        where: {
            serviceId: id,
        },
        data: payload,
        include: {
            bike: true,
        },
    });
    return result;
});
const getByStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getByStatus called');
    const result = yield utils_1.prisma.serviceRecord.findMany({
        where: {
            AND: [
                {
                    OR: [{ status: 'pending' }, { status: 'in_progress' }],
                },
                {
                    serviceDate: {
                        lt: new Date(new Date().setDate(new Date().getDate() - 7)),
                    },
                },
            ],
        },
        include: {
            bike: true,
        },
    });
    console.log(result);
    return result;
});
exports.BikeServices = {
    addService,
    getAllServices,
    getServiceById,
    updateService,
    getByStatus,
};
