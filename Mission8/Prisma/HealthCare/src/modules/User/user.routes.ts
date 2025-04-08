import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User route');
});

router.post('/create-admin', UserController.createAdmin);

export const UserRouter = router;
