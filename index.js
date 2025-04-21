const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database');
const TaskModel = require('./src/model/Task.model');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = 3000;
connectToDatabase();

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const task = new TaskModel(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        res.status(204).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
