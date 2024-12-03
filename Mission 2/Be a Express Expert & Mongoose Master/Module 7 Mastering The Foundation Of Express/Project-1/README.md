# Node.js and Express.js Basics

## What is Node.js?

Node.js is a runtime environment that allows JavaScript to be executed outside the browser, primarily on the server side. Built on Chrome's V8 JavaScript engine, it enables building scalable and high-performance applications.

### Why is Node.js Popular?

- **Asynchronous and Event-Driven**: Ideal for I/O-intensive tasks.
- **Fast Execution**: Powered by the V8 engine.
- **Single Programming Language**: Both frontend and backend can use JavaScript.
- **Rich Ecosystem**: Access to npm, a massive library of packages.

---

## How JavaScript Works on the Server

In Node.js, JavaScript is executed in a single-threaded, non-blocking environment. This architecture relies on asynchronous programming, enabling efficient handling of multiple connections.

---

## Cons of Using Node.js

- **Single-Threaded**: Not ideal for CPU-intensive operations.
- **Callback Hell**: Can lead to messy and hard-to-read code.
- **Immature Modules**: Some npm packages may lack quality control.

---

## Node.js Architecture

Node.js uses an event-driven, non-blocking I/O model that relies on:

- **V8**: The JavaScript engine that compiles JavaScript into machine code.
- **libuv**: A library responsible for abstracting asynchronous I/O operations and managing the event loop and thread pool.

### Event Loop

The event loop processes I/O operations asynchronously and efficiently.

### Thread Pool

libuv maintains a thread pool to handle heavy operations like file I/O.

---

## Modules in Node.js

Modules are reusable blocks of code that can be imported and exported.

### IIFE (Immediately Invoked Function Expression)

A JavaScript function that runs immediately after being defined.

### CommonJS vs. ES Modules

- **CommonJS**: Uses `require()` and `module.exports`.
- **ES Modules**: Uses `import` and `export`.

---

### Module Types

1. **Local Modules**: User-defined modules within a project.
2. **Built-In Modules**: Provided by Node.js (e.g., `fs`, `path`).
3. **Third-Party Modules**: Installed via npm.

#### Example: Built-In Module (`fs`)

```javascript
const fs = require("fs");

// Read File Asynchronously
fs.readFile("./text/read.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

// Write File Asynchronously
fs.writeFile("./text/write.txt", "Hello World", (err) => {
  if (err) console.log(err);
  console.log("File written successfully");
});

// Append to File
fs.appendFile("./text/write.txt", "\nHello World Again", (err) => {
  if (err) console.log(err);
  console.log("Content appended successfully");
});
```

---

## Event-Driven Architecture

Node.js uses events to handle asynchronous operations.

### EventEmitter Example

```javascript
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}`);
});

eventEmitter.emit("greet", "Developer");
```

---

## Streams and Buffers

Streams and Buffers efficiently handle large chunks of data.

### Types of Streams

1. Readable
2. Writable
3. Duplex
4. Transform

#### Stream Example

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/read-file" && req.method === "GET") {
    const readableStream = fs.createReadStream("./text/read.txt");

    readableStream.on("data", (chunk) => {
      res.write(chunk);
    });

    readableStream.on("end", () => {
      res.end("File read successfully");
    });

    readableStream.on("error", (err) => {
      res.statusCode = 500;
      res.end("Error reading file");
    });
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## Express.js Basics

### Installing Express with TypeScript

```bash
npm install express @types/express
```

### Why Use Express?

- Simplifies server setup.
- Supports middleware for extensibility.
- Provides built-in routing.

### Parsers, Request, and Response

- Parsers like `express.json()` process request bodies.
- `req` (request) and `res` (response) objects manage HTTP transactions.

### Middleware in Express.js

Middleware functions process requests and responses or execute code.

### Example: Logging Middleware

```typescript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

### Express Error Handling

Custom and global error handling for improved robustness.

#### Example

```typescript
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error.message,
  });
});
```

### Full Example with Express

```typescript
import express, { Request, Response, NextFunction } from "express";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Developers!");
});

app.post("/", (req: Request, res: Response) => {
  res.json({
    message: req.body,
    success: true,
  });
});

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ success: false, message: error.message });
});

export default app;
```

---

## Summary

This document covered:

1. Node.js basics and architecture.
2. Module types and examples.
3. Event-driven architecture.
4. Streams and buffers.
5. Introduction to Express.js, middleware, and error handling.

Explore these concepts to master backend development with Node.js and Express.js!
