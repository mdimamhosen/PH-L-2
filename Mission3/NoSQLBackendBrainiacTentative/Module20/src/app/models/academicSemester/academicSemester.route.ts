import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import DataValidation from '../../middlewares/ValidateUserRequest';
import { academicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  DataValidation(academicSemesterValidationSchema.academicSemesterValidation),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);
router.get('/', AcademicSemesterController.getAllAcademicSemesters);

router.patch(
  '/:semesterId',
  DataValidation(
    academicSemesterValidationSchema.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const academicSemesterRouter = router;
