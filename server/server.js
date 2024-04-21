const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const itemsPool = require('./dbConfig')

router.get('/', async (req, res) => {
    try {
        const result = await itemsPool.query('SELECT * FROM event_data');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        // Construct the SQL query to bulk insert data into the database
        const values = data.map((data, index) => {
            const placeholderString = `($${index * 8 + 1}, $${index * 8 + 2}, $${index * 8 + 3}, $${index * 8 + 4}, $${index * 8 + 5}, $${index * 8 + 6}, $${index * 8 + 7}, $${index * 8 + 8})`;
            return placeholderString;
        }).join(',');

        const query = {
            text: `INSERT INTO event_data (start_time, end_time, title, event_loc, building, short_desc, event_date, long_desc) VALUES ${values}`,
            values: data.reduce((acc, data) => {
                acc.push(data.start_time, data.end_time, data.title, data.event_loc, data.building, data.short_desc, data.event_date, data.long_desc);
                return acc;
            }, [])
        };

        // Connect to the database and execute the query
        const client = await itemsPool.connect();
        await client.query('BEGIN'); // Start a transaction
        await client.query(query); // Execute the bulk insert query
        await client.query('COMMIT'); // Commit the transaction

        // Release the client back to the pool
        client.release();

        // Send a success response
        res.status(200).send('Data inserted successfully');
        
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while inserting data');
    }
})

module.exports = router;
