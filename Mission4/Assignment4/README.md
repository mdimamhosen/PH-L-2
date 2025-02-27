# StoryNest

StoryNest is a Book Shop application built with modern web technologies. It includes user registration, authentication, product management, and seamless order handling with SurjoPay payment gateway integration.

## Project Overview

StoryNest is an e-commerce platform where users can browse, search, and purchase books. Admins can manage products, orders, and users via a role-based dashboard. The platform also integrates React Chart.js for dynamic data visualization.

**Live Link:** [https://srorynest-omega.vercel.app/](https://srorynest-omega.vercel.app/)

## Technologies Used

- TypeScript
- React
- Redux Toolkit (RTK Query)
- React Chart.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt
- SurjoPay Payment Gateway

## Folder Structure

### Server

```
server/
│
├─ src/
│   ├─ app.ts                 # Main Express App
│   ├─ config/                # Configurations (Database, Env, etc.)
│   ├─ modules/               # Feature Modules
│   │   ├─ auth/              # Authentication Module
│   │   ├─ product/           # Product Module
│   │   └─ order/             # Order Module
│   ├─ middleware/            # Middleware
│   ├─ utils/                 # Utility Functions
│   └─ index.ts               # Server Entry Point
│
└─ .env                       # Environment Variables
```

### Client

```
client/
│
├─ public/                    # Static Files
├─ src/
│   ├─ components/            # Reusable Components
│   ├─ hooks/                 # Custom Hooks
│   ├─ pages/                 # Pages (Home, Product Details, Checkout)
│   ├─ redux/                 # Redux Store and Slices
│   ├─ routes/                # Route Configurations
│   ├─ services/              # API Services using RTK Query
│   ├─ charts/                # Dynamic Charts with React Chart.js
│   └─ App.tsx                # Main App Component
│
└─ .env                       # Environment Variables
```

## Environment Variables

### Server `.env.example`

```
PORT=
MONGO_URI=
NODE_ENV=
BCRYPT_SALT=
DEFAULT_PASSWORD=
JWT_SECRET=
JWT_EXPIRATION=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRATION=
MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=
MAIL_PASS=
MAIL_USER=
RESET_UI_URL=
CLOUD_NAME=
API_KEY=
API_SECRET=
SP_ENDPOINT=
SP_USERNAME=
SP_PASSWORD=
SP_PREFIX=
SP_RETURN_URL=
```

### Client `.env.example`

```
VITE_API_BASE_URL=
VITE_SURJO_PAY_API_KEY=
```

## Features

### Public Routes

- Home Page
- All Products Page with Search & Filter
- Product Details Page
- About Us Page

### Private Routes

- Checkout Page with Stock Validation & Payment Gateway
- User Dashboard (View Orders, Manage Profile)
- Admin Dashboard (Manage Products, Users, and Orders)

### Authentication

- JWT-based Authentication
- Secure Password Hashing with Bcrypt
- Role-Based Access Control

### Payment Integration

- SurjoPay Payment Gateway

### Data Visualization

- Dynamic charts using React Chart.js

## Installation

### Server

```bash
git clone https://github.com/mdimamhosen/StroyNest-Server.git
cd StroyNest-Server
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

#### Scripts

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "tsc",
  "lint": "eslint \"src/**/*.ts\"",
  "lint:fix": "npx eslint src --fix",
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
  "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
  "start:prod": "node ./dist/server.js",
  "start": "nodemon ./dist/server.js"
}
```

### Client

```bash
git clone https://github.com/mdimamhosen/SroryNest-Client.git
cd SroryNest-Client
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

#### Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

## API Documentation

API documentation is automatically generated via Postman or Swagger.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
