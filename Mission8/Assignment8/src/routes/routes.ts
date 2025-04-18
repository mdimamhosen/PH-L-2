import express from 'express';
import { CustomerRoutes } from '../modules/customer/customers.routes';
import { BikeRoutes } from '../modules/bikes/bikes.routes';
import { BikeServiceRoutes } from '../modules/bikeService/bikeService.routes';

const router = express.Router();

const routerModules = [
  {
    path: '/customers',
    module: CustomerRoutes,
  },
  {
    path: '/bikes',
    module: BikeRoutes,
  },
  {
    path: '/services',
    module: BikeServiceRoutes,
  },
];

routerModules.forEach(route => {
  router.use(route.path, route.module);
});

export default router;
