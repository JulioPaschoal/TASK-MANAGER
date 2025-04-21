const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database');

dotenv.config();
const app = express();
const PORT = 3000;
connectToDatabase();

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
