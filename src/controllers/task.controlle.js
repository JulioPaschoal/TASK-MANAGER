const TaskModel = require('../model/Task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async getById() {
        try {
            const task = await TaskModel.findById(this.req.params.id);
            if (!task) {
                return this.res
                    .status(404)
                    .send('Essa tarefa não foi encontrada');
            }
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const task = new TaskModel(this.req.body);
            await task.save();
            this.res.status(201).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
            const taskToUpdate = await TaskModel.findById(taskId);
            const allowedUpdate = ['isCompleted'];
            const requestedUpdates = Object.keys(this.req.body);
            for (const update of requestedUpdates) {
                if (allowedUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(500)
                        .send('Um ou mais campos inseridos não são editáveis');
                }
            }
            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
