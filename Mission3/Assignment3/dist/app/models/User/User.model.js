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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Id is required'],
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [255, 'Name can not be more than 255 characters'],
        minlength: [3, 'Name can not be less than 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validator: {
            validate: (value) => {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            },
            message: '{VALUE} is not a valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
        minlength: [6, 'Password can not be less than 6 characters'],
        maxlength: [255, 'Password can not be more than 255 characters'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not supported',
        },
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this; // doc
        // hashing password and save into DB
        user.password = yield bcryptjs_1.default.hash(user.password, Number(10));
        next();
    });
});
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
UserSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield exports.User.findOne({ email }).select('password');
        if (!isUser)
            return false;
        return true;
    });
};
UserSchema.statics.isUserBlocked = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield exports.User.findOne({ email, isBlocked: true }).select('password');
        if (!isUser)
            return false;
        return true;
    });
};
UserSchema.statics.isUserDeleted = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield exports.User.findOne({ email, isDeleted: true });
        if (!isUser)
            return false;
        return true;
    });
};
UserSchema.statics.isPasswordMatched = function (password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email }).select('password');
        if (!user)
            return false;
        const isPass = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPass)
            return false;
        return true;
    });
};
UserSchema.statics.isJwtIssuedBeforePasswordChange = function (passwordChangeTimeStamp, jwtIssuedTimeStamp) {
    console.log({
        passwordChangeTimeStamp: passwordChangeTimeStamp.getTime() / 1000,
        jwtIssuedTimeStamp: jwtIssuedTimeStamp,
    });
    if (passwordChangeTimeStamp.getTime() / 1000 > jwtIssuedTimeStamp) {
        return true;
    }
    return false;
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
