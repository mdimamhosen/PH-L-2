"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bikeService_validations_1 = require("./bikeService.validations");
const bikeService_controller_1 = require("./bikeService.controller");
const router = express_1.default.Router();
router.get('/status', bikeService_controller_1.BikeController.getByStatus);
router.post('/', (0, validateRequest_1.default)(bikeService_validations_1.bikeServiceValidations.addServiceValidationSchema), bikeService_controller_1.BikeController.addService);
router.get('/', bikeService_controller_1.BikeController.getAllServices);
router.get('/:id', bikeService_controller_1.BikeController.getServiceById);
router.put('/:id/complete', (0, validateRequest_1.default)(bikeService_validations_1.bikeServiceValidations.updateServiceValidationSchema), bikeService_controller_1.BikeController.updateService);
exports.BikeServiceRoutes = router;
