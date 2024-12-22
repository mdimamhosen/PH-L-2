import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouter } from './models/student/student.route';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/v1/student', studentRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World Developers!');
});

export default app;
