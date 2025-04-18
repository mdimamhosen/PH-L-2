"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customers_routes_1 = require("../modules/customer/customers.routes");
const bikes_routes_1 = require("../modules/bikes/bikes.routes");
const bikeService_routes_1 = require("../modules/bikeService/bikeService.routes");
const router = express_1.default.Router();
const routerModules = [
    {
        path: '/customers',
        module: customers_routes_1.CustomerRoutes,
    },
    {
        path: '/bikes',
        module: bikes_routes_1.BikeRoutes,
    },
    {
        path: '/services',
        module: bikeService_routes_1.BikeServiceRoutes,
    },
];
routerModules.forEach(route => {
    router.use(route.path, route.module);
});
exports.default = router;
