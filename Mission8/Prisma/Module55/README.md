# Prisma Module 55

This project demonstrates the use of Prisma ORM with a PostgreSQL database. It includes various examples of CRUD operations, filtering, pagination, transactions, and more.

## Project Structure

### 1. `prisma/schema.prisma`

This file defines the Prisma schema, which includes:

- **Models**: `User`, `Post`, `Profile`, `Category`, and `PostCategory` (for many-to-many relationships).
- **Enums**: `UserRole` (e.g., `user`, `admin`).
- **Datasource**: Specifies the PostgreSQL database connection using the `DATABASE_URL` environment variable.
- **Generator**: Configures Prisma Client for JavaScript/TypeScript.

### 2. `prisma/migrations/`

This folder contains migration files:

- `migration_lock.toml`: Tracks the migration provider.
- `20250406142707_init/migration.sql`: The initial migration script to create tables and relationships.
- `20250407125918_init_55/migration.sql`: Adds the `age` column to the `users` table.

### 3. `src/`

This folder contains TypeScript files demonstrating various Prisma operations:

#### a. `index.ts`

- Demonstrates a basic `findMany` query to retrieve all posts.

#### b. `create.ts`

- Shows how to create users, profiles, categories, and posts.
- Includes examples of creating posts with categories using `connect` and `create`.

#### c. `find.ts`

- Demonstrates how to:
  - Retrieve all posts.
  - Find a post by ID.
  - Use `findFirst` and `findFirstOrThrow` for conditional queries.

#### d. `filtering.ts`

- Explains advanced filtering techniques:
  - `AND`, `OR`, `NOT` conditions.
  - `IN` filtering with arrays.
  - Nested filtering with relationships.

#### e. `update.ts`

- Demonstrates how to:
  - Update a single post.
  - Update multiple posts using `updateMany`.

#### f. `delete.ts`

- Shows how to delete:
  - A single post by ID.
  - Multiple posts using `deleteMany`.

#### g. `upsert.ts`

- Demonstrates the `upsert` operation:
  - Updates a post if it exists or creates a new one if it doesn't.
- Includes a `findMany` query with `select` to retrieve specific fields.

#### h. `pagination.ts`

- Explains two types of pagination:
  - Offset-based pagination using `skip` and `take`.
  - Cursor-based pagination using `cursor`.
- Includes sorting examples with `orderBy`.

#### i. `relationalQueries.ts`

- Demonstrates relational queries:
  - Fetching a user with their posts and profile using `include`.
  - Filtering users based on their published posts.

#### j. `aggregate.ts`

- Shows aggregation queries:
  - Calculating `_avg`, `_count`, `_sum`, `_min`, and `_max` for user ages.
  - Using `groupBy` with `having` clauses for advanced grouping.

#### k. `transactions.ts`

- Demonstrates batch transactions using `prisma.$transaction`:
  - Creates a new user.
  - Updates an existing user in a single transaction.

#### l. `logging.ts`

- Configures Prisma Client to log database queries.
- Logs query details such as SQL, parameters, duration, and timestamp.

### 4. Configuration Files

#### a. `.env`

- Stores environment variables, such as the `DATABASE_URL`.

#### b. `package.json`

- Defines project dependencies and scripts:
  - `prisma:generate`: Generates the Prisma Client.
  - `prisma:migrate`: Runs database migrations.
  - `prisma:studio`: Opens Prisma Studio for database visualization.

#### c. `tsconfig.json`

- Configures TypeScript compiler options:
  - Targets ES2016.
  - Uses `strict` mode for type checking.
  - Outputs compiled files to the `dist` folder.

#### d. `.gitignore`

- Excludes `node_modules` and `.env` from version control.

#### e. `.vscode/settings.json`

- Configures VS Code to format Prisma files on save using the Prisma extension.

## How to Run

1. Install dependencies:
   ```sh
   npm install
   ```
