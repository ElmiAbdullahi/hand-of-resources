-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS subaru;

CREATE TABLE subaru (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    model VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    year INT NOT NULL

);

INSERT INTO subaru(
    model,
    type,
    year
)


