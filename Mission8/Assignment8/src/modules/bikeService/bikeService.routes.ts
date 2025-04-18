import express from 'express';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { bikeServiceValidations } from './bikeService.validations';
import { BikeController } from './bikeService.controller';

const router = express.Router();
router.get('/status', BikeController.getByStatus);
router.post(
  '/',
  ValidateUserRequest(bikeServiceValidations.addServiceValidationSchema),
  BikeController.addService,
);

router.get('/', BikeController.getAllServices);
router.get('/:id', BikeController.getServiceById);

router.put(
  '/:id/complete',
  ValidateUserRequest(bikeServiceValidations.updateServiceValidationSchema),
  BikeController.updateService,
);

export const BikeServiceRoutes = router;
