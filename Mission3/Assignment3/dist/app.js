"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./app/routes/routes");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.get('/', (req, res) => {
    res.send('Home route...');
});
app.get('/api', (req, res) => {
    res.send('API route...');
});
app.use('/api', routes_1.routes);
// Global error handler
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
