import express from 'express';
import { studentController } from './student.controller';
const router = express.Router();

router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getStudent);
router.get('/:id', studentController.getSingleStudent);
router.delete('/:id', studentController.deleteSingleStudent);
router.patch('/:id', studentController.updateSingleStudent);
export const studentRouter = router;
