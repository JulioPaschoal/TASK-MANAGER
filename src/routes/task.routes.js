const express = require('express');
const TaskModel = require('../model/Task.model');
const TaskController = require('../controllers/task.controlle');

const router = express.Router();

router.get('/', async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get('/:id', async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post('/', async (req, res) => {
    return new TaskController(req, res).Create();
});

router.put('/:id', async (req, res) => {
    return new TaskController(req, res).update();
});

router.delete('/:id', async (req, res) => {
    return new TaskController(req, res).delete();
});

module.exports = router;
