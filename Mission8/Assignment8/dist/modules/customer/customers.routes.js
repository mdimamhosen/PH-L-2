"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customers_controller_1 = require("./customers.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customers_validations_1 = require("./customers.validations");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(customers_validations_1.customerValidation.createCustomer), customers_controller_1.CustomerController.createCustomer);
router.get('/', customers_controller_1.CustomerController.getAllCustomers);
router.get('/:id', customers_controller_1.CustomerController.getCustomerById);
router.put('/:id', (0, validateRequest_1.default)(customers_validations_1.customerValidation.updateCustomer), customers_controller_1.CustomerController.updateCustomer);
router.delete('/:id', customers_controller_1.CustomerController.deleteCustomer);
exports.CustomerRoutes = router;
