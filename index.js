const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/task.routes');

const connectToDatabase = require('./src/database/mongoose.database');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = 3000;
connectToDatabase();

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
