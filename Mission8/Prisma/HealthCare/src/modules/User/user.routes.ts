import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { upload } from '../../utils/fileUpload';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User route');
});

router.post(
  '/create-admin',
  upload.single('file'),
  // auth(UserRole.SUPER_ADMIN),
  UserController.createAdmin,
);

export const UserRouter = router;
