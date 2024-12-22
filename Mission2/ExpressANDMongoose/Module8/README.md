# Project Setup with TypeScript, ESLint, and Prettier

Setting up a TypeScript project with ESLint and Prettier ensures code quality and consistency. Follow these steps to configure your project:

## 1. Initialize the Project

Start by creating a new Node.js project:

```bash
mkdir my-project
cd my-project
npm init -y
```

## 2. Install TypeScript

Install TypeScript as a development dependency:

```bash
npm install --save-dev typescript
```

Create a `tsconfig.json` file to specify the compiler options:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## 3. Install and Configure ESLint

Install ESLint along with the TypeScript plugin and parser:

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Initialize ESLint:

```bash
npx eslint --init
```

When prompted:

- Choose "To check syntax, find problems, and enforce code style."
- Select "JavaScript modules (import/export)."
- Choose "None of these" for frameworks.
- Select "Yes" for TypeScript.
- Choose your preferred style guide (e.g., Airbnb, Standard).
- Opt for a JSON configuration file.

Modify the generated `.eslintrc.json` to include the TypeScript parser and plugin:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["warn", "double"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-var": "error",
    "prefer-const": ["warn", { "ignoreReadBeforeAssign": true }],
    "no-console": "warn"
  },
  "ignorePatterns": ["node_modules/", "dist/"]
}
```

## 4. Install and Configure Prettier

Install Prettier as a development dependency:

```bash
npm install --save-dev prettier
```

Create a `.prettierrc` file to define your formatting rules:

```json
{
  "semi": true,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

To ensure ESLint and Prettier work seamlessly together, install the following packages:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

Update your ESLint configuration to include Prettier:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "semi": ["error", "always"],
    "quotes": ["warn", "double"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-var": "error",
    "prefer-const": ["warn", { "ignoreReadBeforeAssign": true }],
    "no-console": "warn"
  }
}
```

## 5. Add Scripts to `package.json`

Enhance your `package.json` with the following scripts:

```json
"scripts": {
  "build": "tsc",
  "lint": "eslint 'src/**/*.ts'",
  "lint:fix": "eslint 'src/**/*.ts' --fix",
  "format": "prettier --write 'src/**/*.{ts,js,json}'",
  "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
  "start:prod": "node ./dist/server.js",
  "start": "nodemon ./dist/server.js"
}
```

## 6. Using `ts-node-dev`

For efficient development, `ts-node-dev` allows you to run your TypeScript application without manual compilation:

```bash
npm install --save-dev ts-node-dev
```

Use the following command to start your development server:

```bash
npx ts-node-dev --respawn --transpile-only ./src/server.ts
```

- `--respawn`: Restarts the process when files change.
- `--transpile-only`: Skips type checking for faster compilation.

## 7. Software Design Patterns: MVC vs. Modular

When structuring your application, consider the following design patterns:

### Model-View-Controller (MVC)

The MVC pattern divides the application into three interconnected components:

- **Model**: Manages the data and business logic.
- **View**: Handles the display and presentation layer.
- **Controller**: Processes user input and interacts with the Model and View.

This separation promotes organized code and facilitates maintenance.

### Modular Architecture

A modular approach structures the application into independent, interchangeable modules, each responsible for a specific functionality. This enhances code reusability and scalability, making it easier to manage complex applications.

### Folder Structure Example

For a TypeScript project following best practices:

```
src/
├── controllers/
│   └── userController.ts
├── models/
│   ├── userModel.ts
│   └── userSchema.ts
├── interfaces/
│   └── userInterface.ts
├── services/
│   └── userService.ts
├── routes/
│   └── userRoutes.ts
└── app.ts
```

- **interfaces/**: Contains TypeScript interfaces.
- **models/**: Includes Mongoose schemas and models.
- **services/**: Handles business logic and database queries.
- **controllers/**: Manages request and response handling.
- **routes/**: Defines application routes.

### Example Interface and Schema

**Interface (`userInterface.ts`):**

```typescript
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}
```

**Schema (`userSchema.ts`):**

```typescript
import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/userInterface';

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook
userSchema.pre('save', function (next) {
  // Hash password before saving
  // this.password = hashFunction(this.password);
  next();
});

// Post-save hook
userSchema.post('save', function (doc) {
  console.log(`User ${doc.name} has been saved.`);
});

export const UserModel = model;
```
