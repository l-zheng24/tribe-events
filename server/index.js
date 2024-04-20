const express = require('express');
const path = require('path');
// const db = require('./db');
const itemsPool = require('./dbConfig')

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// app.get("/", (req, res) => {
//     res.send("This is from express.js");
// });

app.use(express.static(path.join(__dirname, '../frontend')));

// app.use((req, res) => {
//     res.status(200).send('Hello, world!');
// });

app.get('/', async (req, res) => {
    try {
        const result = await itemsPool.query('SELECT * FROM event_data');
        res.json(result.json);
    //   res.send(result.rows);
    } catch (err) {
        console.error(err);
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});