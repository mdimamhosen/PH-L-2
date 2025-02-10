"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
// import { UserRoutes } from '../models/User/User.CommonUser.route';
const Auth_route_1 = require("../models/Auth/Auth.route");
const Blog_route_1 = require("../models/Blog/Blog.route");
const User_Admin_route_1 = require("../models/User/User.Admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/admin',
        module: User_Admin_route_1.AdminRoutes,
    },
    // {
    //   path: '/auth',
    //   module: UserRoutes,
    // },
    {
        path: '/auth',
        module: Auth_route_1.AuthRoutes,
    },
    {
        path: '/blogs',
        module: Blog_route_1.BlogRoute,
    },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.module);
});
exports.routes = router;
