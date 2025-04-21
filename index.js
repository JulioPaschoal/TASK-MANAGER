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
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        const allowedUpdate = ['isCompleted'];
        const requestedUpdates = Object.keys(req.body);

        for (update of requestedUpdates) {
            if (allowedUpdate.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send('Um ou mais campos inseridos não são editáveis');
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {}
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
