-- Active: 1743661936863@@127.0.0.1@5432@ph


-- ! Common Commands for create a student table in PostgreSQL

-- Corrected CREATE TABLE statement
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    grade CHAR(2) NOT NULL,
    course VARCHAR(50) NOT NULL,
    dob DATE,
    blood_group VARCHAR(3),
    address VARCHAR(255),
    phone_number VARCHAR(15),
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger function to update the updated_at column
-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.updated_at = CURRENT_TIMESTAMP;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create a trigger to call the function before any update
-- CREATE TRIGGER set_updated_at
-- BEFORE UPDATE ON student
-- FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();


-- -- Insert sample data into the student table
INSERT INTO student (first_name, last_name, age, email, grade, course, dob, blood_group, address, phone_number, country) VALUES
('John', 'Doe', 20, 'john.doe@example.com', 'A', 'Mathematics', '2003-05-15', 'O+', '123 Main St', '01712345678', 'USA'),
('Jane', 'Smith', 22, 'jane.smith@example.com', 'B', 'Physics', '2001-08-20', 'A-', '456 Elm St', '01798765432', 'Canada'),
('Alice', 'Johnson', 19, 'alice.johnson@example.com', 'A', 'Chemistry', '2004-02-10', 'B+', '789 Oak St', '01711223344', 'UK'),
('Bob', 'Brown', 21, 'bob.brown@example.com', 'C', 'Biology', '2002-11-25', 'AB-', '321 Pine St', '01799887766', 'Australia'),
('Charlie', 'Davis', 23, 'charlie.davis@example.com', 'B', 'History', '2000-07-30', 'O-', '654 Maple St', '01744556677', 'India'),
('Emily', 'Wilson', 20, 'emily.wilson@example.com', 'A', 'Computer Science', '2003-03-12', 'A+', '987 Birch St', '01722334455', 'Germany'),
('Frank', 'Miller', 24, 'frank.miller@example.com', 'C', 'Engineering', '1999-09-18', 'B-', '159 Cedar St', '01766778899', 'France'),
('Grace', 'Taylor', 18, 'grace.taylor@example.com', 'A', 'Literature', '2005-01-05', 'AB+', '753 Walnut St', '01733445566', 'Japan'),
('Henry', 'Anderson', 21, 'henry.anderson@example.com', 'B', 'Philosophy', '2002-06-22', 'O+', '951 Spruce St', '01755667788', 'China'),
('Ivy', 'Thomas', 19, 'ivy.thomas@example.com', 'A', 'Art', '2004-10-14', 'A-', '357 Cherry St', '01777889900', 'Brazil');


INSERT INTO student (first_name, last_name, age, email, grade, course, dob, blood_group, address, phone_number, country) VALUES ('Weee', 'Thomas', 19, 'wee.thomas@example.com', 'A', 'Art', '2004-10-14', 'A-', '357 Cherry St', '01777889900', 'Brazil');


-- -- Select all data from the student table
SELECT * FROM student;

--! These all are DDl commands: Data Definition Language commands
CREATE TABLE  IF NOT EXISTS  "practice" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "age" INT NOT NULL,
    "email" VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO practice VALUES(1, 'imam', 20, 'imam@gmail.com');
INSERT INTO practice VALUES(2,'imam 2', 22 , 'imam2@gmail.com');

-- To get all the data from the table practice
SELECT * FROM practice;

ALTER TABLE practice ADD COLUMN address VARCHAR(255) DEFAULT 'Unknown' NOT NULL;
ALTER TABLE practice ADD COLUMN phone_number VARCHAR(15) DEFAULT '01700000000' NOT NULL;

ALTER TABLE practice DROP COLUMN address; 

ALTER TABLE practice RENAME COLUMN phone_number TO mobile_number;
ALTER TABLE practice RENAME TO student;

ALTER TABLE student RENAME TO practice;

ALTER TABLE practice ALTER COLUMN name SET NOT NULL;
ALTER TABLE practice ALTER COLUMN name SET DEFAULT 'Unknown';


-- Just to add new column to the table

ALTER TABLE practice ADD COLUMN address VARCHAR(55) DEFAULT 'unknown' ;
ALTER TABLE practice ADD COLUMN uid VARCHAR(15) DEFAULT '!!!' ;

ALTER TABLE practice ADD COLUMN testaddress VARCHAR(255);

-- Delete the column testaddress from the table practice
ALTER TABLE practice DROP COLUMN testaddress;

-- Delete the column uid from the table practice
ALTER TABLE practice DROP COLUMN uid;
-- 




-- -- Step 1: Check for duplicates or NULL values
-- SELECT address, COUNT(*) 
-- FROM practice 
-- GROUP BY address 
-- HAVING COUNT(*) > 1 OR address IS NULL;

-- Step 2: Update NULL or duplicate values (example fix)
-- UPDATE practice
-- SET address = CONCAT(address, '_', id)
-- WHERE address IS NULL OR address IN (
--     SELECT address
--     FROM practice
--     GROUP BY address
--     HAVING COUNT(*) > 1
-- );

-- Step 3: Add the UNIQUE constraint
ALTER TABLE practice ADD CONSTRAINT unique_practice_testaddress_key UNIQUE (testaddress);   

-- ALTER TABLE practice ADD CONSTRAINT pkey_practice_id PRIMARY KEY (id);

-- If i want to drop the primary key constraint
ALTER TABLE practice DROP CONSTRAINT pkey_practice_id;


-- If i want to drop the unique constraint
ALTER TABLE practice DROP CONSTRAINT unique_practice_testaddress_key; 

-- If i want to drop the foreign key constraint
ALTER TABLE practice DROP CONSTRAINT fk_practice_id;

-- If i want to delte the table with all the data
DROP TABLE IF EXISTS practice CASCADE;

-- If i want to delete the table without all the data 
TRUNCATE TABLE practice CASCADE;


-- ! These all are DQL commands: Data Query Language commands
--? SELECT : 


-- Selecting all columns from the student table
SELECT * FROM student;


-- Selecting specific columns from the student table
SELECT first_name, last_name, email FROM student;

SELECT concat(first_name, ' ', last_name) AS full_name, email FROM student;


-- Selecting with a WHERE clause    
SELECT * FROM student WHERE age > 20;
SELECT * FROM student WHERE first_name = 'John' AND last_name = 'Doe';

SELECT * FROM student WHERE email LIKE '%@example.com';
SELECT * FROM student WHERE first_name ILIKE 'j%'; -- Case-insensitive search

SELECT * FROM student WHERE age BETWEEN 18 AND 22;
SELECT * FROM student WHERE dob < '2000-01-01';

SELECT * FROM student WHERE blood_group IS NOT NULL;
SELECT * FROM student WHERE address IS NULL;

-- Selecting with ORDER BY clause
SELECT * FROM student ORDER BY last_name ASC; 
SELECT * FROM student ORDER BY age DESC, first_name ASC;
SELECT * FROM student ORDER BY created_at DESC; -- Order by created_at in descending order
SELECT * FROM student ORDER BY first_name ASC, last_name DESC; -- Order by first_name ascending and last_name descending



-- Selecting distinct values
SELECT DISTINCT grade FROM student ORDER BY grade ASC;
SELECT COUNT(DISTINCT course) course_count FROM student WHERE grade = 'A' 

SELECT course, COUNT(course) AS course_count FROM student GROUP BY course ORDER BY course_count DESC;


SELECT upper(first_name) AS upper_first_name, lower(last_name) AS lower_last_name FROM student;
SELECT initcap(first_name) AS capitalized_first_name, initcap(last_name) AS capitalized_last_name FROM student;


--! Scalar functions

Scalar functions are functions that return a single value based on the input value. Here are some examples of scalar functions in PostgreSQL:
-- 1. UPPER: Converts a string to uppercase
-- SELECT UPPER(first_name) AS upper_first_name FROM student;
-- 2. LOWER: Converts a string to lowercase
-- SELECT LOWER(last_name) AS lower_last_name FROM student;
-- 3. INITCAP: Capitalizes the first letter of each word in a string
-- SELECT INITCAP(first_name) AS capitalized_first_name FROM student;
-- 4. LENGTH: Returns the length of a string
-- SELECT LENGTH(first_name) AS first_name_length FROM student;
-- 5. TRIM: Removes leading and trailing spaces from a string
-- SELECT TRIM(first_name) AS trimmed_first_name FROM student;
-- 6. SUBSTRING: Extracts a substring from a string
-- SELECT SUBSTRING(first_name FROM 1 FOR 3) AS first_name_substring FROM student; 
-- 7. CONCAT: Concatenates two or more strings
-- SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM student;
-- 8. COALESCE: Returns the first non-null value in a list of arguments
-- SELECT COALESCE(phone_number, 'N/A') AS phone_number FROM student;
-- 9. ROUND: Rounds a numeric value to a specified number of decimal places
-- SELECT ROUND(age::numeric, 0) AS rounded_age FROM student;
-- 10. NOW: Returns the current date and time
-- SELECT NOW() AS current_timestamp;
-- 11. DATE_PART: Extracts a specific part of a date or timestamp
-- SELECT DATE_PART('year', dob) AS birth_year FROM student;
-- 12. AGE: Calculates the age based on a date or timestamp
-- SELECT AGE(dob) AS age FROM student;
-- 13. EXTRACT: Extracts a specific field from a date or timestamp
-- SELECT EXTRACT(YEAR FROM dob) AS birth_year FROM student;    
-- 14. TO_CHAR: Converts a date or timestamp to a string in a specified format
-- SELECT TO_CHAR(dob, 'YYYY-MM-DD') AS formatted_dob FROM student; 
-- 15. TO_DATE: Converts a string to a date in a specified format
-- SELECT TO_DATE('2023-10-01', 'YYYY-MM-DD') AS converted_date;
-- 16. TO_TIMESTAMP: Converts a string to a timestamp in a specified format
-- SELECT TO_TIMESTAMP('2023-10-01 12:34:56', 'YYYY-MM-DD HH24:MI:SS') AS converted_timestamp;
-- 17. DATE_TRUNC: Truncates a date or timestamp to a specified precision
-- SELECT DATE_TRUNC('month', dob) AS truncated_dob FROM student;
-- 18. AGE: Calculates the interval between two dates or timestamps
-- SELECT AGE(NOW(), dob) AS age_interval FROM student;
-- 19. DATEADD: Adds a specified interval to a date or timestamp
-- SELECT dob + INTERVAL '1 year' AS next_year_dob FROM student;
-- 20. DATEDIFF: Calculates the difference between two dates or timestamps
-- SELECT AGE(NOW(), dob) AS age_difference FROM student;
-- 21. CURRENT_DATE: Returns the current date
-- SELECT CURRENT_DATE AS today_date;
-- 22. CURRENT_TIME: Returns the current time
-- SELECT CURRENT_TIME AS current_time;
-- 23. CURRENT_TIMESTAMP: Returns the current date and time
-- SELECT CURRENT_TIMESTAMP AS current_timestamp;



--! Aggregate functions
-- Aggregate functions are functions that perform calculations on a set of values and return a single value. Here are some examples of aggregate functions in PostgreSQL:

-- 1. COUNT: Returns the number of rows in a set
-- SELECT COUNT(*) AS total_students FROM student;
-- 2. SUM: Returns the sum of a numeric column
-- SELECT SUM(age) AS total_age FROM student;
-- 3. AVG: Returns the average value of a numeric column
-- SELECT AVG(age) AS average_age FROM student;
-- 4. MIN: Returns the minimum value of a column
-- SELECT MIN(age) AS youngest_student FROM student;    
-- 5. MAX: Returns the maximum value of a column
-- SELECT MAX(age) AS oldest_student FROM student;
-- 6. GROUP_CONCAT: Concatenates values from multiple rows into a single string (not available in PostgreSQL, but can be achieved using STRING_AGG)
-- SELECT STRING_AGG(first_name, ', ') AS all_first_names FROM student;
-- 7. ARRAY_AGG: Aggregates values into an array
-- SELECT ARRAY_AGG(first_name) AS all_first_names_array FROM student; 
-- SELECT max(length(first_name)) AS max_length_first_name FROM student;
-- SELECT min(length(first_name)) AS min_length_first_name FROM student;
-- SELECT avg(length(first_name)) AS avg_length_first_name FROM student;

--! Uses of NOT IN operator
-- SELECT * FROM student WHERE id NOT IN (1, 2, 3);
-- SELECT * FROM student WHERE id NOT IN (SELECT id FROM student WHERE age > 20);
-- SELECT * FROM student WHERE id NOT IN (SELECT id FROM student WHERE age > 20) AND grade = 'A';
-- Users of NOT operator
-- SELECT * FROM student WHERE NOT (age > 20 AND grade = 'A');
-- SELECT * FROM student WHERE NOT (first_name = 'John' OR last_name = 'Doe');

-- Uses of IN operator
-- SELECT * FROM student WHERE id IN (1, 2, 3);
-- SELECT * FROM student WHERE id IN (SELECT id FROM student WHERE age > 20);

-- Uses of EXISTS operator
-- SELECT * FROM student WHERE EXISTS (SELECT 1 FROM student WHERE age > 20);
-- SELECT * FROM student WHERE EXISTS (SELECT 1 FROM student WHERE age > 20) AND grade = 'A';

-- Uses of NOT EXISTS operator
-- SELECT * FROM student WHERE NOT EXISTS (SELECT 1 FROM student WHERE age > 20);

-- Uses of ANY operator
-- SELECT * FROM student WHERE age > ANY (SELECT age FROM student WHERE grade = 'A');
SELECT * FROM student WHERE age < ANY (SELECT age FROM student WHERE grade = 'A');

-- NULL 
-- SELECT * FROM student WHERE age IS NULL;
-- SELECT * FROM student WHERE age IS NOT NULL;


--! NULL Coalescing Operator
-- SELECT COALESCE(age, 0) AS age_or_zero FROM student; -- THis will return 0 if age is NULL
-- SELECT COALESCE(email, 'N/A') AS email_or_na FROM student; -- This will return 'N/A' if email is NULL
-- SELECT COALESCE(NULL, NULL, 'default_value') AS result; -- This will return 'default_value'
-- SELECT COALESCE(NULL, NULL, NULL) AS result; -- This will return NULL
 

--  ! Like , Between, ILIKE, SIMILAR TO, ~, ~*, !~, !~* operators
-- LIKE: Used for pattern matching in strings
-- SELECT * FROM student WHERE first_name LIKE 'J%'; -- Matches names starting with 'J'
-- SELECT * FROM student WHERE first_name LIKE '%n'; -- Matches names ending with 'n'
-- SELECT * FROM student WHERE first_name LIKE '%o%'; -- Matches names containing 'o'
-- SELECT * FROM student WHERE first_name LIKE '_o%'; -- Matches names with 'o' as the second character
-- SELECT * FROM student WHERE first_name LIKE 'J__n'; -- Matches names with 'J' at the start and 'n' at the end, with exactly two characters in between

-- ! ILIKE: Case-insensitive version of LIKE
-- SELECT * FROM student WHERE first_name ILIKE 'j%'; -- Matches names starting with 'j' or 'J'
-- SELECT * FROM student WHERE first_name ILIKE '%n'; -- Matches names ending with 'n' or 'N'
-- SELECT * FROM student WHERE first_name ILIKE '%o%'; -- Matches names containing 'o' or 'O'
-- SELECT * FROM student WHERE first_name ILIKE '_o%'; -- Matches names with 'o' or 'O' as the second character
-- SELECT * FROM student WHERE first_name ILIKE 'J__n'; -- Matches names with 'J' or 'j' at the start and 'n' or 'N' at the end, with exactly two characters in between


-- ! SIMILAR TO: Similar to LIKE but supports regular expressions
-- SELECT * FROM student WHERE first_name SIMILAR TO 'J%'; -- Matches names starting with 'J'
-- SELECT * FROM student WHERE first_name SIMILAR TO '%n'; -- Matches names ending with 'n'
-- SELECT * FROM student WHERE first_name SIMILAR TO '%o%'; -- Matches names containing 'o'
-- SELECT * FROM student WHERE first_name SIMILAR TO '_o%'; -- Matches names with 'o' as the second character
-- SELECT * FROM student WHERE first_name SIMILAR TO 'J__n'; -- Matches names with 'J' at the start and 'n' at the end, with exactly two characters in between


-- ! ~: Matches a string against a regular expression (case-sensitive)
--SELECT * FROM student WHERE first_name ~ '^[Jj]'; -- Matches names starting with 'J' or 'j'
-- SELECT * FROM student WHERE first_name ~ 'n$'; -- Matches names ending with 'n'
-- SELECT * FROM student WHERE first_name ~ 'o'; -- Matches names containing 'o'
-- SELECT * FROM student WHERE first_name ~ '^o'; -- Matches names starting with 'o'
-- SELECT * FROM student WHERE first_name ~ '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' at the end, with exactly two characters in between
-- SELECT * FROM student WHERE first_name ~ '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' at the end, with exactly two characters in between
-- SELECT * FROM student WHERE first_name ~ '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' at the end, with exactly two characters in between
-- SELECT * FROM student WHERE first_name ~ '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' at the end, with exactly two characters in between
-- SELECT * FROM student WHERE first_name ~ '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' at the end, with exactly two characters in between

-- ! ~*: Case-insensitive version of ~
-- SELECT * FROM student WHERE first_name ~* '^[Jj]'; -- Matches names starting with 'J' or 'j'
-- SELECT * FROM student WHERE first_name ~* 'n$'; -- Matches names ending with 'n' or 'N'
-- SELECT * FROM student WHERE first_name ~* 'o'; -- Matches names containing 'o' or 'O'
-- SELECT * FROM student WHERE first_name ~* '^o'; -- Matches names starting with 'o' or 'O'
-- SELECT * FROM student WHERE first_name ~* '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' or 'N' at the end, with exactly two characters in between
-- SELECT * FROM student WHERE first_name ~* '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' or 'N' at the end, with exactly two characters in between
-- SELECT * FROM student WHERE first_name ~* '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' or 'N' at the end, with exactly two characters in between
-- SELECT * FROM student WHERE first_name ~* '^[Jj].{2}n$'; -- Matches names with 'J' or 'j' at the start and 'n' or 'N' at the end, with exactly two characters in between


-- ! !~: Matches a string against a regular expression (case-sensitive) and returns rows that do not match
-- SELECT * FROM student WHERE first_name !~ '^[Jj]'; -- Matches names not starting with 'J' or 'j'
-- SELECT * FROM student WHERE first_name !~ 'n$'; -- Matches names not ending with 'n'



-- ! Limit and Offset
-- LIMIT: Limits the number of rows returned by a query
-- SELECT * FROM student LIMIT 5; -- Returns the first 5 rows
-- OFFSET: Skips a specified number of rows before returning the result set
-- SELECT * FROM student OFFSET 10; -- Skips the first 10 rows and returns the rest

-- LIMIT and OFFSET together: Limits the number of rows returned after skipping a specified number of rows
-- SELECT * FROM student LIMIT 5 OFFSET 10; -- Returns 5 rows starting from the 11th row
-- SELECT * FROM student LIMIT 5 OFFSET 0; -- Returns the first 5 rows

-- ! Pagination Example
-- SELECT * FROM student LIMIT 10 OFFSET 5*0; -- Page 1 (rows 0-9) total 5 pages
-- SELECT * FROM student LIMIT 10 OFFSET 5*1; -- Page 2 (rows 10-19) total 5 pages
-- SELECT * FROM student LIMIT 10 OFFSET 5*2; -- Page 3 (rows 20-29) total 5 pages
-- SELECT * FROM student LIMIT 10 OFFSET 5*3; -- Page 4 (rows 30-39) total 5 pages
-- SELECT * FROM student LIMIT 10 OFFSET 5*4; -- Page 5 (rows 40-49) total 5 pages
-- SELECT * FROM student LIMIT 10 OFFSET 5*5; -- Page 6 (rows 50-59) total 5 pages
