"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Parse JSON bodies (as sent by API clients)
app.use(express_1.default.json());
// Parse text data bodies (as sent by API clients)
app.use(express_1.default.text());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express_1.default.urlencoded({ extended: true }));
// Creating Routes
const userRouter = express_1.default.Router();
app.use(userRouter);
userRouter.get("/api/v1/users/create-user", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        res.json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Middleware to log all incoming requests
const logReq = (req, res, next) => {
    console.log({
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
        hostname: req.hostname,
    });
    next();
};
app.get("/", logReq, (req, res) => {
    console.log(req.body);
    res.send("Hello Developers!");
});
app.post("/", logReq, (req, res) => {
    console.log(req.body);
    res.json({
        message: req.body,
        success: true,
    });
});
// Custom error handler
app.all("*", (req, res, next) => {
    const error = new Error("Resource not found");
    next(error);
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    else {
        next();
    }
});
exports.default = app;
