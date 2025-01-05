import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouter } from './models/student/student.route';
import { UserRoutes } from './models/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/users', UserRoutes);
// Global error handler
app.use(globalErrorHandler);

// Not found route

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found', success: false });
});
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World Developers!');
});

export default app;
