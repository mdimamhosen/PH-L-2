import express from 'express';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { bikeValidations } from './bikes.validations';
import { BikeController } from './bikes.controller';

const router = express.Router();

router.post(
  '/',
  ValidateUserRequest(bikeValidations.addBikes),
  BikeController.addBike,
);

router.get('/', BikeController.getAllBikes);
router.get('/:id', BikeController.bikeById);

router.put(
  '/:id',
  ValidateUserRequest(bikeValidations.updateBikes),
  BikeController.updateBike,
);

export const BikeRoutes = router;
