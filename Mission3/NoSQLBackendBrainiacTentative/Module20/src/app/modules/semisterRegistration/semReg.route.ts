import express from 'express';
import { SemesterRegistrationController } from './semReg.controller';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { SemesterRegistrationValidation } from './semReg.validation';

const router = express.Router();

router.get('/', SemesterRegistrationController.getAllRegisteredSemester);
router.get('/:id', SemesterRegistrationController.getSingleRegisteredSemester);
router.put(
  '/:id',
  DataValidation(
    SemesterRegistrationValidation.SemesterRegistrationUpdateValidation,
  ),
  SemesterRegistrationController.updateRegisteredSemistered,
);

router.post(
  '/create-semester-registration',
  DataValidation(
    SemesterRegistrationValidation.SemesterRegistrationCreationValidation,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
