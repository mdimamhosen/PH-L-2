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

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) ,
    email VARCHAR(100) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users VALUES(4,'Joh','jhondoe@gmail.com') , (2,'John Doe','jhondoe@gmail.com') , (3,'Jhon Snow','jhondoe@gmail.com') ;

CREATE TABLE IF NOT EXISTS user_logs (
    log_id SERIAL PRIMARY KEY,
    deleted_user_id INT,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;
SELECT * FROM user_logs;

CREATE OR REPLACE FUNCTION log_user_deletion_function()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$ 
    BEGIN
    INSERT INTO user_logs (deleted_user_id, deleted_at) 
    VALUES (OLD.user_id, CURRENT_TIMESTAMP);
    RAISE NOTICE 'User with ID % has been deleted at %', OLD.user_id, CURRENT_TIMESTAMP;
    RETURN OLD;
    END;
$$

CREATE OR REPLACE TRIGGER log_user_deletion 
AFTER DELETE
ON users
FOR EACH ROW
EXECUTE FUNCTION log_user_deletion_function();

DELETE FROM users WHERE user_id = 2;
DELETE FROM users WHERE user_id = 3;

SELECT * FROM users;
SELECT * FROM user_logs;