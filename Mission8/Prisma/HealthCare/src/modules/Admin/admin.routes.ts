import express from 'express';
import { AdminController } from './admin.controller';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validate';

const router = express.Router();

router.get(
  '/',

  AdminController.getAllAdmins,
);

router.get('/:id', AdminController.getAdminById);

router.patch(
  '/:id',
  ValidateUserRequest(adminValidation.updateAdminSchema),
  AdminController.updateAdminById,
);

router.delete('/:id', AdminController.deleteAdminById);

export const AdminRouter = router;
