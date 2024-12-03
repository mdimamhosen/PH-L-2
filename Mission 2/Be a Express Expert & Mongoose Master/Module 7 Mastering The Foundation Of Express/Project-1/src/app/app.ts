import express, { NextFunction, Request, Response } from "express";
const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Parse text data bodies (as sent by API clients)
app.use(express.text());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Creating Routes

const userRouter = express.Router();
app.use(userRouter);

userRouter.get(
  "/api/v1/users/create-user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      res.json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Middleware to log all incoming requests

const logReq = (req: Request, res: Response, next: NextFunction) => {
  console.log({
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
    hostname: req.hostname,
  });
  next();
};

app.get("/", logReq, (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Hello Developers!");
});

app.post("/", logReq, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: req.body,
    success: true,
  });
});

// Custom error handler

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Resource not found");
  next(error);
});

// Global Error Handler

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } else {
    next();
  }
});

export default app;
