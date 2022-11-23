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

VALUES 
('BRZ', 'coupe', 2017),
('Outback', 'wagon', 2021),
('WRX STI', 'sedan', 2015),
('Crosstrek XV', 'sedan', 2020),
('Forester', 'SUV', 2019);

-- Table #2
-- DROP TABLE IF EXISTS toyota;

-- CREATE TABLE toyota (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     model VARCHAR NOT NULL,
--     type VARCHAR NOT NULL,
--     year INT NOT NULL

-- );

-- INSERT INFO

