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

export const academicSemesterRouter = router;
