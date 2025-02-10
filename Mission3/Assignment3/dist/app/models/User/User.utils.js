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
exports.UserUtils = exports.genarateUserId = exports.genarateAdminId = void 0;
const User_model_1 = require("./User.model");
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield User_model_1.User.findOne({
        role: 'admin',
    }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
const genarateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentAdminId = (0).toString().padStart(4, '0');
    const lastAdminId = yield findLastAdminId();
    if (lastAdminId) {
        currentAdminId = (Number(lastAdminId) + 1).toString().padStart(4, '0');
    }
    else {
        currentAdminId = (Number(currentAdminId) + 1).toString().padStart(4, '0');
    }
    const adminId = `A-${currentAdminId}`;
    return adminId;
});
exports.genarateAdminId = genarateAdminId;
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield User_model_1.User.findOne({
        role: 'user',
    }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id) ? lastUser.id.substring(2) : undefined;
});
const genarateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentUserId = (0).toString().padStart(4, '0');
    const lastUserId = yield findLastUserId();
    console.log('last user id', lastUserId);
    if (lastUserId) {
        currentUserId = (Number(lastUserId) + 1).toString().padStart(4, '0');
    }
    else {
        currentUserId = (Number(currentUserId) + 1).toString().padStart(4, '0');
    }
    const userId = `U-${currentUserId}`;
    return userId;
});
exports.genarateUserId = genarateUserId;
exports.UserUtils = {
    genarateAdminId: exports.genarateAdminId,
    genarateUserId: exports.genarateUserId,
};
