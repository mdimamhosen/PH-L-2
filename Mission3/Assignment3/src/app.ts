import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './app/routes/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(cookieParser());

app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Home route...');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('API route...');
});

app.use('/api', routes);

// Global error handler
app.use(globalErrorHandler);

app.use(notFound);

export default app;
