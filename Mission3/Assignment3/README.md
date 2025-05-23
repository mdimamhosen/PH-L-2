# BuBlog

A backend service for a blogging platform where users can create, update, and delete blogs. The system supports role-based access control with two user roles: **Admin** and **User**. Admins can manage users and blogs, while users can manage their own blogs. The platform includes secure authentication, public APIs for fetching blogs, and advanced functionalities like search, sort, and filter.

## Features

### User Roles

- **Admin**:

  - Manually created in the database with predefined credentials.
  - Can delete any blog.
  - Can block users by updating their `isBlocked` status.
  - Cannot update any blog.

- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization

- **Authentication**:

  - Users must log in to perform write, update, and delete operations.

- **Authorization**:
  - Role-based access control to differentiate Admin and User permissions.

### Blog API

- A public API for reading blogs.
- Supports:
  - Search blogs by title or content.
  - Sort blogs by fields like `createdAt` or `title` in ascending or descending order.
  - Filter blogs by author ID.

---

## Technologies

- **Programming Language**: TypeScript
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose

---

## Models

### User Model

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin" | "user",
  "isBlocked": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Blog Model

```json
{
  "title": "string",
  "content": "string",
  "author": "ObjectId",
  "isPublished": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## API Endpoints

### Authentication

#### Register User

**POST** `/api/auth/register`

- Registers a new user.

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:

- **Success (201)**:

```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

- **Failure (400)**:

```json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

#### Login User

**POST** `/api/auth/login`

- Authenticates a user and generates a JWT token.

Request Body:

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:

- **Success (200)**:

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

- **Failure (401)**:

```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

---

### Blog Management

#### Create Blog

**POST** `/api/blogs`

- Allows a logged-in user to create a blog.

Request Body:

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

#### Update Blog

**PATCH** `/api/blogs/:id`

- Allows a logged-in user to update their own blog by ID.

#### Delete Blog

**DELETE** `/api/blogs/:id`

- Allows a logged-in user to delete their own blog by ID.

#### Get All Blogs (Public)

**GET** `/api/blogs`

- Fetches all blogs with options for:
  - `search`: Search by title or content.
  - `sortBy`: Sort by fields like `createdAt` or `title`.
  - `sortOrder`: Sort order (`asc` or `desc`).
  - `filter`: Filter by author ID.

Example:

```
GET /api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId
```

---

### Admin Actions

#### Block User

**PATCH** `/api/admin/users/:userId/block`

- Allows an admin to block a user.

#### Delete Blog

**DELETE** `/api/admin/blogs/:id`

- Allows an admin to delete any blog by ID.

---

## Error Handling

### Common Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

### Types of Errors

- **Zod Validation Error**: Errors from invalid data inputs.
- **Not Found Error**: When requested resources are not found.
- **Validation Error**: Incorrect data formats or missing fields.
- **Authentication Error**: Issues with token or expired sessions.
- **Authorization Error**: Insufficient permissions.
- **Internal Server Error**: Unexpected server issues.

---

## Usage

### Admin Credentials

- **Email**: `admin@gmail.com`
- **Password**: `12345678`

### Git Repository

- **Repo**: [GitHub Repository](https://github.com/mdimamhosen/bublog)

### Live Application

- **Live Link**: [BuBlog](https://bublog-nine.vercel.app/)
