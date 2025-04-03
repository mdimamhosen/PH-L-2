# PostgreSQL Shell (psql) Commands

## Connecting to PostgreSQL

### 1. Connect to a Database

```sh
\c database_name
```

Connects to the specified database.

### 2. Show Current Connection Info

```sh
\conninfo
```

Displays information about the current database connection.

## Listing Information

### 3. List All Databases

```sh
\l
```

Shows all databases available on the PostgreSQL server.

### 4. List All Tables in the Current Database

```sh
\dt
```

Displays all tables in the current database.

### 5. List All Schemas

```sh
\dn
```

Displays all schemas in the current database.

### 6. List All Users/Roles

```sh
\du
```

Shows all roles and users along with their privileges.

### 7. List All Indexes

```sh
\di
```

Shows all indexes in the current database.

### 8. List All Sequences

```sh
\ds
```

Displays all sequences in the current database.

### 9. List All Views

```sh
\dv
```

Lists all views available in the database.

## Table and Command Descriptions

### 10. Describe a Table (Show Schema/Structure)

```sh
\d table_name
```

Shows the structure of a table, including columns, types, and constraints.

### 11. Show All Available Commands

```sh
\?
```

Displays a list of all available `psql` commands.

### 12. Show All SQL Commands

```sh
\h
```

Lists all available SQL commands in PostgreSQL.

### 13. Get Help for a Specific SQL Command

```sh
\h command_name
```

Example:

```sh
\h SELECT
```

Provides syntax and details about the `SELECT` command.

## Executing SQL Files

### 14. Execute a SQL File

```sh
\i path/to/file.sql
```

Runs a SQL script from a file.

## Shell Operations

### 15. Clear the Screen

```sh
\! cls   # On Windows
\! clear  # On Linux/Mac
```

Clears the terminal screen.

### 16. Exit psql Shell

```sh
\q
```

Quits the PostgreSQL shell.

## User and Role Management

### 17. Creating a New User

```sh
CREATE USER user3;
```

Creates a new user `user3`.

### 18. Assigning a Role to a User

```sh
GRANT role1 TO user3;
```

Assigns the role `role1` to `user3`.

### 19. Creating a User with a Password

```sh
CREATE USER user4 WITH LOGIN ENCRYPTED PASSWORD '111111';
```

Creates a user `user4` with login access and an encrypted password.

### 20. Assigning a Role to a User with Login

```sh
GRANT role1 TO user4;
```

Grants `role1` to `user4`, allowing them to inherit its privileges.

### 21. Granting Privileges on Tables

```sh
GRANT ALL PRIVILEGES ON TABLE testTable TO user2;
```

Grants all privileges on `testTable` to `user2`.

```sh
GRANT SELECT ON TABLE testTable TO user2;
```

Grants only `SELECT` permission on `testTable` to `user2`.

```sh
REVOKE SELECT ON TABLE testTable FROM noobuser;
```

Revokes `SELECT` permission from `noobuser`.

```sh
GRANT SELECT ON ALL TABLES IN SCHEMA public TO role1;
```

Grants `SELECT` permission on all tables in the `public` schema to `role1`.

### 🚀 **Now you're ready to navigate and manage PostgreSQL using psql!**
