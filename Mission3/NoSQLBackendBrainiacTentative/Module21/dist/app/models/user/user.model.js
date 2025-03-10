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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin', 'superAdmin'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this; // doc
        // hashing password and save into DB
        user.password = yield bcrypt_1.default.hash(user.password, Number(10));
        next();
    });
});
// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield exports.User.findOne({ id }).select('password');
        if (!isUser)
            return false;
        return true;
    });
};
userSchema.statics.isUserBlocked = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield exports.User.findOne({ id, status: 'blocked' }).select('password');
        if (!isUser)
            return false;
        return true;
    });
};
userSchema.statics.isUserDeleted = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield exports.User.findOne({ id, isDeleted: true });
        if (!isUser)
            return false;
        return true;
    });
};
userSchema.statics.isPasswordMatched = function (password, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ id }).select('password');
        if (!user)
            return false;
        const isPass = yield bcrypt_1.default.compare(password, user.password);
        if (!isPass)
            return false;
        return true;
    });
};
userSchema.statics.isJwtIssuedBeforePasswordChange = function (passwordChangeTimeStamp, jwtIssuedTimeStamp) {
    console.log({
        passwordChangeTimeStamp: passwordChangeTimeStamp.getTime() / 1000,
        jwtIssuedTimeStamp: jwtIssuedTimeStamp,
    });
    if (passwordChangeTimeStamp.getTime() / 1000 > jwtIssuedTimeStamp) {
        return true;
    }
    return false;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
