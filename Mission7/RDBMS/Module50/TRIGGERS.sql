-- Active: 1743661936863@@127.0.0.1@5432@ph



-- ! TRIGGER are used to automatically perform a specified action in the database when certain events occur. They are often used for tasks such as enforcing data integrity, auditing changes, or implementing complex business rules. Triggers can be set to fire before or after an insert, update, or delete operation on a table.


-- Table Level Triggers:
    -- INSERT, UPDATE, DELETE, TRUNCATE
-- Row Level Triggers:
    -- INSERT, UPDATE, DELETE
-- Statement Level Triggers:
    -- INSERT, UPDATE, DELETE, TRUNCATE

--DATABASE TRIGGER:
    -- Database Setup, Database Shutdown, Database Startup, Database Error, Connection start and end etc.

--! For Creating a Trigger:
/* 
! Create Trigger Syntax:
    CREATE TRIGGER trigger_name
    {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE | TRUNCATE}
    ON table_name
    [FOR EACH ROW | FOR EACH STATEMENT]
    EXECUTE PROCEDURE function_name();
*/