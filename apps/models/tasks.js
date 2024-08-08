// model of task
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    title: String,
    description: String,
    priority: String
});

const task = mongoose.model('Task', taskSchema);


module.exports = {
    model: mongoose.model("Task", taskSchema),
    schema: taskSchema
};