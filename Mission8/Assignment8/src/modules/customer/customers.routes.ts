import express from 'express';
import { CustomerController } from './customers.controller';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { customerValidation } from './customers.validations';
const router = express.Router();

router.post(
  '/',
  ValidateUserRequest(customerValidation.createCustomer),
  CustomerController.createCustomer,
);

router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomerById);

router.put(
  '/:id',
  ValidateUserRequest(customerValidation.updateCustomer),
  CustomerController.updateCustomer,
);

router.delete('/:id', CustomerController.deleteCustomer);

export const CustomerRoutes = router;
