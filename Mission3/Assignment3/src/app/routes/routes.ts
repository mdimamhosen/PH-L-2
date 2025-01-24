import express from 'express';
import { AdminRoutes } from '../models/User/User.Admin';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admin',
    module: AdminRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});

export const routes = router;
