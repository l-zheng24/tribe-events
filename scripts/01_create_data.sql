CREATE TABLE event_data
(
    event_id serial PRIMARY KEY,
    title TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    event_date DATE,
    event_loc TEXT NOT NULL,
    short_desc TEXT,
    long_desc TEXT
);

INSERT INTO event_data (title, start_time, end_time, event_date, event_loc, short_desc, long_desc) VALUES 
    ('test title', '12:00:00', '14:00:00', '06/01/2024', 'testing location', 'testing short description', 'testing really really really really really really really long description here'),
    ('test title1', '12:00', '14:00', '07/01/2024', 'testing location', 'testing short description', 'testing really really really really really really really really really really long description here');