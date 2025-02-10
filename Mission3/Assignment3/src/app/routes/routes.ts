import express from 'express';
// import { UserRoutes } from '../models/User/User.CommonUser.route';
import { AuthRoutes } from '../models/Auth/Auth.route';
import { BlogRoute } from '../models/Blog/Blog.route';
import { AdminRoutes } from '../models/User/User.Admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admin',
    module: AdminRoutes,
  },
  // {
  //   path: '/auth',
  //   module: UserRoutes,
  // },
  {
    path: '/auth',
    module: AuthRoutes,
  },
  {
    path: '/blogs',
    module: BlogRoute,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});

export const routes = router;
