const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model('Task', TaskSchema);
module.exports = TaskModel;
