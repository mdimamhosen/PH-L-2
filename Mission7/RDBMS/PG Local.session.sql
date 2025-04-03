CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
);

INSERT INTO "session" ("sid", "sess", "expire") VALUES ('1', '{}', '2021-07-07 15:00:00.000000');


SELECT * FROM session;