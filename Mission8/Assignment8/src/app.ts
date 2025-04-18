import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound);
export default app;
