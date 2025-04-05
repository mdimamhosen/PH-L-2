-- Active: 1743661936863@@127.0.0.1@5432@ph
 
-- TimeZone: 
SHOW timezone;
-- TimeZone: UTC 
SELECT current_timestamp;

CREATE TABLE timezone (
    id SERIAL, 
    ts TIMESTAMP WITHOUT TIME ZONE, 
    ts_tz TIMESTAMP WITH TIME ZONE
);

INSERT INTO timezone (ts, ts_tz) VALUES (now(), now());
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'UTC');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/New_York');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Europe/London');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Asia/Tokyo');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Australia/Sydney');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/Los_Angeles');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/Chicago');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/Denver');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/Phoenix');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/Anchorage');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Pacific/Honolulu');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/Argentina/Buenos_Aires');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'America/Sao_Paulo');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Europe/Berlin');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Europe/Paris');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Europe/Moscow');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Europe/Rome');
INSERT INTO timezone (ts, ts_tz) VALUES (now(), now() AT TIME ZONE 'Europe/Madrid');




-- 
SELECT now();

SELECT CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP, LOCALTIMESTAMP, LOCALTIME;


SELECT now()::date;


SELECT to_char(now(), 'DDD') AS formatted_date;
SELECT to_char(now(), 'Month') AS formatted_date;
SELECT to_char(now(), 'Day') AS formatted_date;
SELECT to_char(now(), 'yyyy-mm-dd') AS formatted_date;
SELECT to_char(now(), 'dd-mm-yyyy hh12:mi:ss') AS formatted_date;
SELECT to_char(now(), 'dd-mm-yyyy hh24:mi:ss.milliseconds') AS formatted_date;
SELECT CURRENT_DATE - INTERVAL '1 day' AS yesterday_date, 
       CURRENT_DATE - INTERVAL '4 year' AS day_before_yesterday_date;

 

SELECT 1::BOOLEAN;

 


CREATE TABLE course (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    description TEXT, 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE student_course (
    id SERIAL PRIMARY KEY, 
    student_id INT REFERENCES student(id), 
    course_id INT REFERENCES course(id), 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);


INSERT INTO course (name, description) VALUES ('Mathematics', 'Basic Mathematics Course') ,
('Science', 'Basic Science Course'), 
('History', 'Basic History Course'), 
('Geography', 'Basic Geography Course'), 
('English', 'Basic English Course'), 
('Computer Science', 'Basic Computer Science Course'), 
('Physics', 'Basic Physics Course'), 
('Chemistry', 'Basic Chemistry Course'), 
('Biology', 'Basic Biology Course'), 
('Art', 'Basic Art Course');



INSERT INTO student_course (student_id, course_id) VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 2), (3, 1), (3, 2), (4, 1), (4, 2), (5, 1), (5, 2), (6, 1), (6, 2), (7, 1), (7, 2), (8, 1), (8, 2), (9, 1), (9, 2), (10, 1), (10, 2);

SELECT * FROM student_course;
SELECT * FROM course;
SELECT * FROM student;

--! Enforcing Referential Integrity: Behaviors During Data Deletion
-- !! Cascading Deletes: When a parent row is deleted, all child rows referencing it are also deleted.
-- !! Set Null: When a parent row is deleted, all child rows referencing it have their foreign key set to NULL.
-- !! Set Default: When a parent row is deleted, all child rows referencing it have their foreign key set to its default value.
-- !! Restrict: Prevents the deletion of a parent row if any child rows reference it.
-- !! No Action: Similar to Restrict, but allows the deletion of a parent row if no child rows reference it at the time of deletion. 

-- !! Cascade: When a parent row is deleted, all child rows referencing it are also deleted.
-- To demonstrate this, we will create a foreign key constraint with the ON DELETE CASCADE option.

DROP TABLE IF EXISTS student_course ;

CREATE TABLE student_course (
    id SERIAL PRIMARY KEY, 
    student_id INT REFERENCES student(id) ON DELETE CASCADE, 
    course_id INT REFERENCES course(id) ON DELETE CASCADE, 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);


DELETE FROM student WHERE id = 1; -- This will also delete all student_course records with student_id = 1

SELECT * FROM student_course;

--! ON DELETE SET NULL: When a parent row is deleted, all child rows referencing it have their foreign key set to NULL.
-- To demonstrate this, we will create a foreign key constraint with the ON DELETE SET NULL option.
CREATE TABLE student_course (
    id SERIAL PRIMARY KEY, 
    student_id INT REFERENCES student(id) ON DELETE SET NULL, 
    course_id INT REFERENCES course(id) ON DELETE SET NULL, 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);

--! ON DELETE SET DEFAULT: When a parent row is deleted, all child rows referencing it have their foreign key set to its default value.
-- To demonstrate this, we will create a foreign key constraint with the ON DELETE SET DEFAULT option.
CREATE TABLE student_course (
    id SERIAL PRIMARY KEY, 
    student_id INT REFERENCES student(id)  ON DELETE SET DEFAULT DEFAULT 2, 
    course_id INT REFERENCES course(id) ON DELETE SET DEFAULT DEFAULT 2, 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);

--! ON DELETE RESTRICT: Prevents the deletion of a parent row if any child rows reference it.
-- To demonstrate this, we will create a foreign key constraint with the ON DELETE RESTRICT option.

CREATE TABLE student_course (
    id SERIAL PRIMARY KEY, 
    student_id INT REFERENCES student(id) ON DELETE RESTRICT, 
    course_id INT REFERENCES course(id) ON DELETE RESTRICT, 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);


--! ON DELETE NO ACTION: Similar to RESTRICT, but allows the deletion of a parent row if no child rows reference it at the time of deletion.
-- To demonstrate this, we will create a foreign key constraint with the ON DELETE NO ACTION option.

CREATE TABLE student_course (
    id SERIAL PRIMARY KEY, 
    student_id INT REFERENCES student(id) ON DELETE NO ACTION, 
    course_id INT REFERENCES course(id) ON DELETE NO ACTION, 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);

SELECT * FROM student_course;
SELECT * FROM course;


CREATE TABLE course_details (
    id SERIAL PRIMARY KEY, 
    course_id INT REFERENCES course(id), 
    instructor VARCHAR(50), 
    duration INT, 
    created_at TIMESTAMP DEFAULT now(), 
    updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO course_details (course_id, instructor, duration) VALUES 
(1, 'John Doe', 30), 
(2, 'Jane Smith', 45), 
(3, 'Alice Johnson', 60), 
(4, 'Bob Brown', 90), 
(5, 'Charlie Davis', 120), 
(6, 'Eve Wilson', 150), 
(7, 'Frank Miller', 180), 
(8, 'Grace Lee', 210), 
(9, 'Hank Taylor', 240), 
(10, 'Ivy Anderson', 270);

 
 
-- JOINING TABLES: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN , CROSS JOIN, SELF JOIN, NATURAL JOIN, USING JOIN
-- INNER JOIN: Returns only the rows that have matching values in both tables.
-- LEFT JOIN: Returns all rows from the left table and the matched rows from the right table. If there is no match, NULL values are returned for columns from the right table.
-- RIGHT JOIN: Returns all rows from the right table and the matched rows from the left table. If there is no match, NULL values are returned for columns from the left table.

-- FULL OUTER JOIN: Returns all rows when there is a match in either left or right table records. It returns NULL for non-matching rows from both tables.
-- EXAMPLE:

--! INNER JOIN: Rules for INNER JOIN
-- 1. Both tables must have a common column to join on.
-- 2. The common column must have the same data type in both tables.
-- 3. The common column must have the same name in both tables or be aliased to the same name.
-- 4. The join condition must be specified in the ON clause.
-- 5. The join condition must be a valid expression that evaluates to true or false.

--! CROSS JOIN: Returns the Cartesian product of both tables, i.e., all possible combinations of rows from both tables.
-- 1. CROSS JOIN does not require a join condition and can result in a large number of rows if both tables have many rows.
-- 2. CROSS JOIN is not commonly used in practice, as it can lead to performance issues and large result sets.
-- 3. CROSS JOIN can be useful for generating test data or for certain analytical queries where all combinations of rows are needed.


--! SELF JOIN: A self join is a regular join but the table is joined with itself.
-- 1. A self join is used to compare rows within the same table.
-- 2. A self join requires an alias for the table to differentiate between the two instances of the same table.
-- 3. A self join can be an INNER JOIN, LEFT JOIN, RIGHT JOIN, or FULL OUTER JOIN, depending on the requirement.

--! NATURAL JOIN: A natural join automatically joins tables based on columns with the same name and data type.
-- 1. A natural join does not require an ON clause, as it automatically matches columns with the same name.
-- 2. A natural join can lead to unexpected results if there are multiple columns with the same name in both tables.
-- 3. A natural join can be an INNER JOIN, LEFT JOIN, RIGHT JOIN, or FULL OUTER JOIN, depending on the requirement.
-- 4. Only the columns with the same name in both tables are included in the result set.

--! FULL JOIN: A full join returns all records when there is a match in either left or right table records. It returns NULL for non-matching rows from both tables.
-- 1. A full join combines the results of both left and right joins.
-- 2. A full join can be useful for identifying records that exist in one table but not the other.
-- 3. A full join can be resource-intensive, especially with large tables, as it returns all records from both tables.
