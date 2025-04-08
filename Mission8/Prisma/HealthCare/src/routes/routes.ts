import express from 'express';
import { UserRouter } from '../modules/User/user.routes';

const router = express.Router();

const routerModules = [
  {
    path: '/user',
    module: UserRouter,
  },
];

routerModules.forEach(route => {
  router.use(route.path, route.module);
});

export default router;
