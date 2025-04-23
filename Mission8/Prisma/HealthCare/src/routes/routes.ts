import express from 'express';
import { UserRouter } from '../modules/User/user.routes';
import { AdminRouter } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { DoctorRoutes } from '../modules/Doctor/doctor.routes';
import { SpecialtiesRoutes } from '../modules/Specialties/specialties.routes';

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
  {
    path: '/doctor',
    module: DoctorRoutes,
  },
  {
    path: '/specialties',
    module: SpecialtiesRoutes,
  },
];

routerModules.forEach(route => {
  router.use(route.path, route.module);
});

export default router;
