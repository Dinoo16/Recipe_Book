const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Completed', 'Not Completed'],
        default: 'Not Completed'
    }
})
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;