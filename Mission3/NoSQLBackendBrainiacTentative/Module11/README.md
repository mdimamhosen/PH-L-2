### Project Setup and File Structure

#### Directory Structure

```
.
├── node_modules/                 # Dependencies
├── src/
│   ├── controllers/              # API Controllers
│   │   └── student.controller.ts # Student-related operations
│   ├── models/                   # Mongoose Models
│   │   └── student.model.ts      # Student Model
│   ├── services/                 # Business logic (Service Layer)
│   │   └── student.service.ts    # Student-related services
│   ├── validations/              # Validation schemas
│   │   └── student.validation.ts # Student validation (Joi/Zod)
│   ├── interfaces/               # TypeScript Interfaces
│   │   └── student.interface.ts  # Student Interface
│   ├── server.ts                 # Entry point for the server
│   ├── routes.ts                 # Define API routes
│   └── utils/                    # Utility functions (e.g., validators)
│       └── email.utils.ts        # Email validation utility
├── dist/                         # Compiled JavaScript (output of TypeScript)
├── .gitignore                    # Git ignore file
├── package.json                  # NPM dependencies and scripts
├── tsconfig.json                 # TypeScript Configuration
├── eslint.config.js              # ESLint Configuration
├── prettier.config.js            # Prettier Configuration
└── README.md                     # Project README
```

---

### **Setting up ESLint and Prettier**

1. **Install ESLint and Prettier**
   Run the following commands to set up ESLint and Prettier in your TypeScript project:

   ```bash
   npm install eslint prettier --save-dev
   ```

2. **Create and Configure `tsconfig.json`**
   Ensure the `tsconfig.json` file has the necessary `include` and `exclude` fields for TypeScript compilation:

   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src"],
     "exclude": ["node_modules"]
   }
   ```

3. **ESLint Configuration (`eslint.config.js`)**
   Add the following ESLint configuration:

   ```js
   import globals from 'globals';
   import pluginJs from '@eslint/js';
   import tseslint from '@typescript-eslint/eslint-plugin';
   import tsParser from '@typescript-eslint/parser';

   /** @type {import('eslint').Linter.FlatConfig[]} */
   export default [
     {
       files: ['**/*.{js,mjs,cjs,ts}'],
       languageOptions: {
         parser: tsParser,
         globals: {
           ...globals.browser,
           process: 'readonly',
         },
       },
       plugins: {
         '@typescript-eslint': tseslint,
       },
       rules: {
         semi: ['error', 'always'],
         quotes: ['warn', 'double'],
         '@typescript-eslint/no-unused-vars': [
           'error',
           { argsIgnorePattern: '^_' },
         ],
         'no-var': 'error',
         'no-unused-vars': 'error',
         'prefer-const': ['warn', { ignoreReadBeforeAssign: true }],
         '@typescript-eslint/no-require-imports': 'off',
         'no-console': 'warn',
         'no-undef': 'error',
       },
       ignores: ['.node_modules/*', 'dist/*', '.gitignore'],
     },
     {
       rules: {
         ...pluginJs.configs.recommended.rules,
         ...tseslint.configs['recommended'].rules,
       },
     },
   ];
   ```

4. **Prettier Configuration (`prettier.config.js`)**
   Add a basic configuration for Prettier:

   ```js
   module.exports = {
     semi: true,
     singleQuote: true,
     arrowParens: 'avoid',
   };
   ```

5. **Add NPM Scripts**
   Add the following commands in the `scripts` section of your `package.json`:
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

---

### **Mongoose Models with TypeScript**

#### **Student Model Example**

1. **Defining the Interface (`student.interface.ts`)**

   ```ts
   export interface Name {
     firstName: string;
     middleName?: string;
     lastName: string;
   }

   export interface Address {
     permanentAddress: string;
     currentAddress: string;
   }

   export interface Guardian {
     name: string;
     contactNumber: string;
     relation: string;
   }

   export interface Student {
     id: string;
     name: Name;
     age: number;
     email: string;
     gender: 'Male' | 'Female';
     contactNumber: string;
     emergencyContactNumber: string;
     address: Address;
     dateOfBirth: Date;
     bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
     guardian: Guardian;
     profilePicture: string;
     isActive: boolean;
   }
   ```

2. **Defining the Schema (`student.model.ts`)**

   ```ts
   import { Schema, model } from 'mongoose';
   import { Student, Name, Address, Guardian } from './student.interface';
   import validator from 'validator';

   const userNameSchema = new Schema<Name>({
     firstName: {
       type: String,
       required: true,
       validate: {
         validator: (value: string) => validator.isAlpha(value),
         message: '{VALUE} is not a valid first name',
       },
     },
     lastName: {
       type: String,
       required: true,
       validate: {
         validator: (value: string) =>
           value.charAt(0).toUpperCase() + value.slice(1) === value,
         message: '{VALUE} is not a valid last name',
       },
     },
     middleName: {
       type: String,
       validate: {
         validator: (value: string) =>
           value ? validator.isAlpha(value) : true,
         message: '{VALUE} is not a valid middle name',
       },
     },
   });

   const addressSchema = new Schema<Address>({
     permanentAddress: { type: String, required: true },
     currentAddress: { type: String, required: true },
   });

   const guardianSchema = new Schema<Guardian>({
     name: { type: String, required: true },
     contactNumber: { type: String, required: true },
     relation: { type: String, required: true },
   });

   const StudentSchema = new Schema<Student>({
     id: { type: String, required: true },
     name: { type: userNameSchema, required: true },
     age: { type: Number, required: true },
     email: {
       type: String,
       required: true,
       validate: {
         validator: (value: string) => validator.isEmail(value),
         message: '{VALUE} is not a valid email',
       },
     },
     gender: { type: String, enum: ['Male', 'Female'], required: true },
     contactNumber: { type: String, required: true },
     emergencyContactNumber: { type: String, required: true },
     address: { type: addressSchema, required: true },
     dateOfBirth: { type: Date, required: true },
     bloodGroup: {
       type: String,
       enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
       optional: true,
     },
     guardian: { type: guardianSchema, required: true },
     profilePicture: { type: String, default: '' },
     isActive: { type: Boolean, default: false },
   });

   const StudentModel = model<Student>('Student', StudentSchema);
   export default StudentModel;
   ```

---

### **Validation Using Joi/Zod**

#### **Joi Validation Example**

1. **Student Validation Schema Using Joi (`student.validation.ts`)**

   ```ts
   import Joi from 'joi';

   const StudentValidationSchema = Joi.object({
     id: Joi.string().required().messages({ 'string.empty': 'ID is required' }),
     name: Joi.object({
       firstName: Joi.string().min(3).max(8).required(),
       lastName: Joi.string().min(3).max(8).required(),
       middleName: Joi.string().optional(),
     }).required(),
     email: Joi.string().email().required(),
     gender: Joi.string().valid('Male', 'Female').required(),
     contactNumber: Joi.string()
       .pattern(/^\+?\d{10,11}$/)
       .required(),
     address: Joi.object({
       permanentAddress: Joi.string().required(),
       currentAddress: Joi.string().required(),
     }).required(),
     dateOfBirth: Joi.date().required(),
   });

   export default StudentValidationSchema;
   ```

---

### **Creating Custom Instance and Static Methods**

#### **Instance Methods**

Instance methods are attached to individual documents of a model.

1. **Adding a Custom Instance Method (`student.model.ts`)**

   ```ts
   StudentSchema.methods.isUserExist = async function (id: string) {
     return await StudentModel.findOne({ id });
   };

   const StudentModel = model<Student>('Student', StudentSchema);
   ```

#### **Static Methods**

Static methods are called on the model itself, not on

individual instances.

1. **Adding a Static Method (`student.model.ts`)**
   ```ts
   StudentSchema.statics.getStudentById = function (id: string) {
     return this.findOne({ id });
   };
   ```

### **Service Layer**

#### **Student Service Example (`student.service.ts`)**

```ts
import StudentModel from '../models/student.model';

export class StudentService {
  async createStudent(studentData) {
    const newStudent = new StudentModel(studentData);
    await newStudent.save();
    return newStudent;
  }

  async getStudentById(id: string) {
    return await StudentModel.getStudentById(id);
  }

  async updateStudent(id: string, updateData) {
    return await StudentModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    });
  }
}

export default new StudentService();
```

### **Controller Layer**

In the **Controller Layer**, we handle incoming HTTP requests and interact with the Service Layer to perform the necessary business logic. Here's how to implement the controller for the `Student` resource.

---

### **Student Controller Example (`student.controller.ts`)**

```ts
import { Request, Response } from 'express';
import studentService from '../services/student.service';
import StudentValidationSchema from '../validations/student.validation';

class StudentController {
  // Create a new student
  async createStudent(req: Request, res: Response) {
    try {
      const { error } = StudentValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const studentData = req.body;
      const newStudent = await studentService.createStudent(studentData);

      return res
        .status(201)
        .json({ message: 'Student created successfully', student: newStudent });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'An error occurred', error: err.message });
    }
  }

  // Get a student by ID
  async getStudentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await studentService.getStudentById(id);

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      return res.status(200).json({ student });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'An error occurred', error: err.message });
    }
  }

  // Update a student's details
  async updateStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const studentData = req.body;
      const updatedStudent = await studentService.updateStudent(
        id,
        studentData,
      );

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }

      return res.status(200).json({
        message: 'Student updated successfully',
        student: updatedStudent,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'An error occurred', error: err.message });
    }
  }

  // Delete a student
  async deleteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await studentService.getStudentById(id);

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      await StudentModel.deleteOne({ id });

      return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'An error occurred', error: err.message });
    }
  }
}

export default new StudentController();
```

---

### **Routes Layer**

The **Routes Layer** is where we define the API endpoints and link them to their respective controller methods.

---

### **Student Routes (`routes.ts`)**

```ts
import express from 'express';
import studentController from './controllers/student.controller';

const router = express.Router();

// Route for creating a new student
router.post('/students', studentController.createStudent);

// Route for getting a student by ID
router.get('/students/:id', studentController.getStudentById);

// Route for updating a student's details
router.put('/students/:id', studentController.updateStudent);

// Route for deleting a student
router.delete('/students/:id', studentController.deleteStudent);

export default router;
```

---

### **Server Setup**

In the **Server Layer**, we set up the Express application, middleware, and connect the routes.

---

### **Server Entry Point (`server.ts`)**

```ts
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS if needed

// Routes
app.use('/api', router);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/schooldb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err.message);
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

---

### **Testing the Application**

Now that you've set up the basic CRUD operations and validation layers, you can start testing the application. Here’s how you can interact with it using Postman or any other API client:

- **POST** `/api/students`: Create a new student.
- **GET** `/api/students/:id`: Retrieve a student by their `id`.
- **PUT** `/api/students/:id`: Update a student’s information.
- **DELETE** `/api/students/:id`: Delete a student.

---

### **Error Handling and Response Formatting**

Ensure that all error responses are consistent. In case of any unexpected errors, you should return a 500 status with a generic message like this:

```ts
res.status(500).json({ message: 'An error occurred', error: error.message });
```

Similarly, for validation errors, respond with the appropriate error code (400) and the validation message:

```ts
res
  .status(400)
  .json({ message: 'Validation error', error: error.details[0].message });
```

---

### **Other Features to Implement**

1. **File Uploads (Profile Pictures)**
   For uploading profile pictures, you can integrate libraries like `multer` for handling file uploads. You can store the images on a cloud service like AWS S3, or locally depending on your requirements.

2. **Authentication and Authorization**
   If needed, add an authentication layer using JWT (JSON Web Tokens) or OAuth to secure certain API endpoints.

3. **Unit and Integration Tests**
   You can add tests using libraries like `Jest` or `Mocha` to ensure that the application works as expected.

---

In Mongoose, you can define **instance methods** and **static methods** to perform custom operations.

- **Instance methods** operate on individual document instances (i.e., a single object).
- **Static methods** operate on the model itself (i.e., for querying or manipulating multiple documents).

This README demonstrates how to create and use both types of methods.

## Setup

To start, make sure you have the necessary dependencies installed:

```bash
npm install mongoose
```

### **Example Code**

```typescript
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the structure of the student document
interface Student extends Document {
  id: string;
  name: string;
  age: number;
  grade: string;
}

// Custom instance method interface
interface StudentMethod {
  isUserExist(id: string): Promise<Student | null>;
}

// Custom static method interface
interface StudentStaticMethodModel extends Model<Student> {
  isUserExist(id: string): Promise<Student | null>;
}

// Define the Student Schema
const StudentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
});

// Adding a custom instance method
StudentSchema.methods.isUserExist = async function (this: Student, id: string) {
  const existingUser = await this.constructor.findOne({ id: id });
  return existingUser;
};

// Adding a custom static method
StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await this.findOne({ id: id });
  return existingUser;
};

// Create the model with custom instance methods and static methods
const StudentModel = mongoose.model<Student, StudentStaticMethodModel>(
  'Student',
  StudentSchema,
);

export default StudentModel;
```

## Creating Custom Instance Methods

Instance methods are added to the Mongoose schema via `Schema.methods`. These methods operate on specific document instances.

### Example of Adding an Instance Method

```typescript
StudentSchema.methods.isUserExist = async function (this: Student, id: string) {
  const existingUser = await this.constructor.findOne({ id: id });
  return existingUser;
};
```

In the above example:

- `isUserExist` is added as an **instance method**.
- The method checks if a student with the specified `id` exists in the database.
- The `this.constructor.findOne()` allows us to use the model (constructor) to query the database.

## Creating Custom Static Methods

Static methods are added to the Mongoose schema via `Schema.statics`. These methods operate on the model itself and are typically used for actions that involve the entire model, such as queries.

### Example of Adding a Static Method

```typescript
StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await this.findOne({ id: id });
  return existingUser;
};
```

In the above example:

- `isUserExist` is added as a **static method**.
- The method checks if a student with the specified `id` exists in the database, and it is called directly on the **model**.

## Usage Example

Here’s how you can use both the **instance method** and **static method** in a typical Mongoose application.

### Static Method Example

Static methods are invoked on the **model** itself.

```typescript
import StudentModel from './models/Student';

async function checkStudentExists(id: string) {
  const student = await StudentModel.isUserExist(id);
  if (student) {
    console.log('Student exists:', student);
  } else {
    console.log('No student found with this ID.');
  }
}

// Example Usage
checkStudentExists('12345');
```

### Instance Method Example

Instance methods are invoked on an **instance** of the model (i.e., a specific document).

```typescript
import StudentModel from './models/Student';

async function createStudentIfNotExist(studentData: {
  id: string;
  name: string;
  age: number;
  grade: string;
}) {
  // Instantiate a new student document
  const student = new StudentModel(studentData);

  // Use the instance method to check if the student exists
  if (await student.isUserExist(student.id)) {
    throw new Error('Student already exists');
  }

  // Save the new student to the database if not exists
  const createdStudent = await student.save();
  console.log('Created Student:', createdStudent);
}

// Example Usage
const studentData = {
  id: '12345',
  name: 'John Doe',
  age: 20,
  grade: '10th',
};

createStudentIfNotExist(studentData)
  .then(() => console.log('Student created successfully'))
  .catch(error => console.log(error.message));
```

### Summary of Differences

- **Static Methods**:

  - Used for operations on the model itself.
  - Invoked using `Model.method()`.
  - Example: Checking if a student exists via `StudentModel.isUserExist(id)`.

- **Instance Methods**:
  - Used for operations on individual documents.
  - Invoked on an instance of the model: `document.method()`.
  - Example: Checking if a specific student exists via `student.isUserExist(id)`.

---

Below is a detailed `README.md` that covers Mongoose Middlewares (Document, Aggregation, and Query middleware) as well as Mongoose Virtuals, including examples.

---

## Mongoose Middleware

### 1. Document Middleware

Document middleware is executed before or after Mongoose documents are saved or removed. These are commonly used for tasks such as validation, modifying data, and cleanup.

#### Example: Document Middleware

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  age: Number,
  isDeleted: { type: Boolean, default: false },
});

// Pre-save middleware: Runs before saving a document
studentSchema.pre('save', function (next) {
  console.log('Saving a student document...');
  next();
});

// Post-save middleware: Runs after saving a document
studentSchema.post('save', function (doc) {
  console.log(`Student ${doc.name} saved!`);
});

// Pre-remove middleware: Runs before removing a document
studentSchema.pre('remove', function (next) {
  console.log(`Removing student ${this.name}...`);
  next();
});

// Post-remove middleware: Runs after removing a document
studentSchema.post('remove', function (doc) {
  console.log(`Student ${doc.name} removed!`);
});

const Student = mongoose.model('Student', studentSchema);
```

### 2. Aggregation Middleware

Aggregation middleware runs before or after the execution of aggregation queries (`aggregate()`).

#### Example: Aggregation Middleware

```javascript
studentSchema.pre('aggregate', function (next) {
  console.log('Running aggregation...');
  next();
});

studentSchema.post('aggregate', function (result) {
  console.log('Aggregation completed. Result:', result);
});
```

### 3. Query Middleware

Query middleware runs before or after queries such as `find()`, `findOne()`, `findById()`, etc. Query middleware is useful for modifying queries or applying filters.

#### Example: Query Middleware

```javascript
// Pre-find middleware: Runs before `find` queries
studentSchema.pre('find', function (next) {
  console.log('Running a find query...');
  this.where({ isDeleted: { $ne: true } }); // Example: Filter out deleted students
  next();
});

// Post-find middleware: Runs after `find` queries
studentSchema.post('find', function (docs) {
  console.log('Found documents:', docs);
});

// Pre-findOne middleware: Runs before `findOne` queries
studentSchema.pre('findOne', function (next) {
  console.log('Running a findOne query...');
  next();
});

// Post-findOne middleware: Runs after `findOne` queries
studentSchema.post('findOne', function (doc) {
  console.log('Found document:', doc);
});
```

### 4. Using `next()` in Pre and Post Middleware

#### Pre-function Example:

The `next()` function is used in **pre** middleware to pass control to the next middleware or the operation (like `save` or `find`) itself.

```javascript
studentSchema.pre('save', function (next) {
  console.log('Pre-save middleware');
  this.age = this.age + 1; // Example: Modify age before saving
  next(); // Continue to the save operation
});
```

#### Post-function Example:

In **post** middleware, you can work with the document that was modified or returned by the operation. You typically don't use `next()` in post middleware.

```javascript
studentSchema.post('save', function (doc) {
  console.log(`Student ${doc.name} was saved with age ${doc.age}`);
});
```

---

## Mongoose Virtuals

Mongoose virtuals are fields that are not stored in the MongoDB database but can be derived or calculated from existing fields. These virtuals are useful for scenarios like creating derived fields for display or manipulating the data when retrieving documents.

### 1. Creating Virtuals

You can define virtuals on your Mongoose schema using `.virtual()`. Virtuals can be used for properties that need to be computed on the fly, like a "full name" based on separate `firstName` and `lastName` fields.

#### Example: Virtuals in Mongoose

```javascript
const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

// Virtual for full name
studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for adult status
studentSchema.virtual('isAdult').get(function () {
  return this.age >= 18;
});

const Student = mongoose.model('Student', studentSchema);

// Example usage
async function getStudentInfo() {
  const student = await Student.findOne({ firstName: 'John' });
  console.log(student.fullName); // Access the virtual fullName
  console.log(student.isAdult); // Access the virtual isAdult
}
```

### 2. Using Virtuals in JSON Output

By default, virtuals are not included when you convert a document to JSON (e.g., using `toJSON()` or `res.json()` in Express). To include virtuals, you need to enable them by setting the `toJSON` option on your schema.

#### Example: Enabling Virtuals in JSON Output

```javascript
studentSchema.set('toJSON', { virtuals: true });

const student = await Student.findOne({ firstName: 'John' });
console.log(student.toJSON()); // The virtual fields will be included in the JSON output
```

### 3. Example: Full Name Virtual and Age Check

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

// Virtual property for full name
studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual property for adult status
studentSchema.virtual('isAdult').get(function () {
  return this.age >= 18;
});

const Student = mongoose.model('Student', studentSchema);

// Usage example
async function example() {
  const student = await Student.findOne({ firstName: 'John' });
  console.log(student.fullName); // Outputs: 'John Doe'
  console.log(student.isAdult); // Outputs: true or false based on age
}

example();
```

---

## Summary

### Mongoose Middlewares:

- **Document Middleware**: Runs during document operations like `save` and `remove`.
- **Aggregation Middleware**: Runs before or after aggregation queries like `aggregate()`.
- **Query Middleware**: Runs before or after query operations like `find`, `findOne`, etc.
- **Usage of `next()`**: `next()` is used in **pre** middleware to continue the process or pass control to the next middleware or query.

### Mongoose Virtuals:

- Virtuals are computed properties based on other fields.
- They can be used for displaying derived data (e.g., full name, age check).
- Virtuals are not stored in the database, but can be included in JSON output with the `toJSON` option.

By using middleware and virtuals, you can extend the functionality of your Mongoose models, add business logic, and enhance the data returned from your queries.
