'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler'),
);
const notFound_1 = __importDefault(require('./app/middlewares/notFound'));
const routes_1 = require('./app/routes');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// const testRoute = async (req: Request, res: Response) => {
//   Promise.reject();
// };
// app.get('/test', testRoute);
// Routes
app.use('/api/v1', routes_1.routes);
// Global error handler
app.use(globalErrorHandler_1.default);
// Not found route
app.use(notFound_1.default);
app.get('/', (req, res) => {
  res.send('Home route...');
});
exports.default = app;
