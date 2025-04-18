"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bikes_validations_1 = require("./bikes.validations");
const bikes_controller_1 = require("./bikes.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(bikes_validations_1.bikeValidations.addBikes), bikes_controller_1.BikeController.addBike);
router.get('/', bikes_controller_1.BikeController.getAllBikes);
router.get('/:id', bikes_controller_1.BikeController.bikeById);
router.put('/:id', (0, validateRequest_1.default)(bikes_validations_1.bikeValidations.updateBikes), bikes_controller_1.BikeController.updateBike);
exports.BikeRoutes = router;
