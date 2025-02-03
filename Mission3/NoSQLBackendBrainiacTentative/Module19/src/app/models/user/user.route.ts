import express, { Request, Response, NextFunction } from 'express';
import { UserController } from './user.controller';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { studentValidations } from '../student/student.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendEmailToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  DataValidation(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  DataValidation(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  DataValidation(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  DataValidation(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRoutes = router;
