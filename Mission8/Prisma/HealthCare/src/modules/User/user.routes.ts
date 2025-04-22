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

router.post(
  '/create-doctor',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  // fileUploader.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //     req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data))
  //     return userController.createDoctor(req, res, next)
  // }
  UserController.createDoctor,
);

router.post(
  '/create-patient',
  auth(UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  UserController.createPatient,
);

export const UserRouter = router;
