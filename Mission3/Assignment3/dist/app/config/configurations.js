"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurations = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.configurations = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    jwtCookieName: process.env.JWT_COOKIE_NAME,
    nodeEnv: process.env.NODE_ENV,
    bcryptSalt: process.env.BCRYPT_SALT,
    defaultPassword: process.env.DEFAULT_PASSWORD,
};
