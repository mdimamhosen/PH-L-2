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

---

### 🚀 **Now you're ready to navigate and manage PostgreSQL using psql!**
