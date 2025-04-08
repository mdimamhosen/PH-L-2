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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, body } = data;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const name = body.name;
    const email = body.email;
    const contactNumber = body.contactNumber;
    const userData = {
        email: email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
    };
    const adminData = {
        name: name,
        contactNumber: contactNumber,
        email: email,
    };
    const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield tx.user.create({
            data: userData,
        });
        const admin = yield tx.admin.create({
            data: Object.assign({}, adminData),
        });
        return { user, admin };
    }));
    return result;
});
exports.UserService = {
    createAdmin,
};
