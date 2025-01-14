import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { routes } from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const testRoute = async (req: Request, res: Response) => {
//   Promise.reject();
// };

// app.get('/test', testRoute);

// Routes
app.use('/api/v1', routes);

// Global error handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Home route...');
});

export default app;
