"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = express_1.default.Router();
const routerModules = [
    {
        path: '/user',
        module: user_routes_1.UserRouter,
    },
    {
        path: '/admin',
        module: admin_routes_1.AdminRouter,
    },
    {
        path: '/auth',
        module: auth_routes_1.AuthRoutes,
    },
];
routerModules.forEach(route => {
    router.use(route.path, route.module);
});
exports.default = router;
