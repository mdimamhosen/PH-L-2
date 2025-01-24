import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './app/routes/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(cookieParser());

app.use('/api', routes);

// Global error handler
app.use(globalErrorHandler);

app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Home route...');
});

export default app;
