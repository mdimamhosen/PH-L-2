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
exports.BikeService = void 0;
const utils_1 = require("../../utils");
const addBike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { brand, model, year, customerId } = payload;
    const bikeData = {
        brand,
        model,
        year,
        customerId,
    };
    const result = yield utils_1.prisma.bike.create({
        data: bikeData,
    });
    return result;
});
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield utils_1.prisma.bike.findMany({
        where: {
            isDeleted: false,
        },
    });
    return result;
});
const getBikeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield utils_1.prisma.bike.findUniqueOrThrow({
        where: {
            bikeId: id,
            isDeleted: false,
        },
    });
    return result;
});
const updateBike = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isIDExists = yield utils_1.prisma.bike.findUniqueOrThrow({
        where: {
            bikeId: id,
        },
    });
    if (!isIDExists)
        throw new Error('Bike ID not found');
    const result = yield utils_1.prisma.bike.update({
        where: {
            bikeId: id,
        },
        data: payload,
    });
    return result;
});
exports.BikeService = {
    addBike,
    getAllBikes,
    getBikeById,
    updateBike,
};
