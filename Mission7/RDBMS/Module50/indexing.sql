-- Active: 1743661936863@@127.0.0.1@5432@ph

-- ! INDEXING:
  -- Indexing is a database optimization technique that improves the speed of data retrieval operations on a database table at the cost of additional space and slower writes. An index is a data structure that provides a quick way to look up rows in a table based on the values of one or more columns. It works similarly to an index in a book, allowing you to quickly find the page number for a specific topic without having to read through the entire book.


CREATE TABLE IF NOT EXISTS allemployee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department VARCHAR(50),
    hire_date DATE
);
-- Insert dummy data into the employees table
CREATE OR REPLACE FUNCTION insert_dummy_employees()
RETURNS VOID 
AS
$$
DECLARE
    i INT;
    first_names TEXT[] := ARRAY['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank'];
    last_names TEXT[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Hernandez'];
    departments TEXT[] := ARRAY['HR', 'Finance', 'Engineering', 'Marketing', 'Sales', 'IT', 'Operations', 'Support', 'Legal', 'R&D'];
BEGIN
    FOR i IN 1..1000000 LOOP
        INSERT INTO allemployee (first_name, last_name, department, hire_date)
        VALUES (
            first_names[FLOOR(RANDOM() * 10 + 1)::INT],
            last_names[FLOOR(RANDOM() * 10 + 1)::INT],
            departments[FLOOR(RANDOM() * 10 + 1)::INT],
            CURRENT_DATE - (FLOOR(RANDOM() * 3650)::INT) -- Random hire date within the last 10 years
        );
    END LOOP;
END;
$$ 
LANGUAGE plpgsql;

-- Call the function to insert 10,000 rows
SELECT insert_dummy_employees();


EXPLAIN ANALYSE
SELECT COUNT(*) FROM allemployee;


EXPLAIN ANALYSE SELECT * FROM allemployee;
EXPLAIN ANALYSE SELECT first_name FROM allemployee WHERE first_name = 'John';

CREATE INDEX idx_allemployee_first_name ON allemployee (first_name);



-- SHOW data_directory;
-- SHOW max_connections;
-- SHOW shared_buffers;
-- SHOW work_mem;
-- SHOW maintenance_work_mem;
-- SHOW effective_cache_size;
-- SHOW default_statistics_target;


CREATE INDEX idx_allemployee_compound ON allemployee (first_name, last_name);

SELECT * FROM

DROP INDEX IF EXISTS idx_allemployee_first_name;

