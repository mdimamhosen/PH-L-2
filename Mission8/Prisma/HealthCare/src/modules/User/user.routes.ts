import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User route');
});

router.post(
  '/create-admin',
  auth(UserRole.SUPER_ADMIN),
  UserController.createAdmin,
);

export const UserRouter = router;
