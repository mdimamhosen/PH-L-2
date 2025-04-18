import express from 'express';
import { UserRouter } from '../modules/User/user.routes';
import { AdminRouter } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const routerModules = [
  {
    path: '/user',
    module: UserRouter,
  },
  {
    path: '/admin',
    module: AdminRouter,
  },
  {
    path: '/auth',
    module: AuthRoutes,
  },
];

routerModules.forEach(route => {
  router.use(route.path, route.module);
});

export default router;
