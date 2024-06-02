const express = require('express')
const router = express.Router();
const Todo = require('../models/Todo');


// filter todo items by status (completed or not) or by due date
router.get('/filter', async(req, res) => {
    try {
        let filter = {};

        // Check if status query parameter exists and is valid
        if (req.query.status) {
            if (req.query.status === 'Completed' || req.query.status === 'Not Completed') {
                filter.status = req.query.status;
            } else {
                return res.status(400).json({ error: 'Invalid status value' });
            }
        }

        // Check if due date query parameter exists and is valid
        if (req.query.due_date) {
            filter.dueDate = req.query.due_date;
        }

        const filteredTodos = await Todo.find(filter);
        res.json(filteredTodos);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Implement sorting options for todo items based on title, due date, or status
router.get('/sorting', async (req, res) => {
    try {
        let sorting = {};

        // Check if sort_by query parameter exists and is valid
        if (req.query.sort_by) {
            if (req.query.sort_by === 'title' || req.query.sort_by === 'dueDate' || req.query.sort_by === 'status') {
                sorting[req.query.sort_by] = 1; // Sort in ascending order by default
            } else if (req.query.sort_by === '-title' || req.query.sort_by === '-dueDate' || req.query.sort_by === '-status') {
                sorting[req.query.sort_by.slice(1)] = -1; // Sort in descending order
            } else {
                return res.status(400).json({ error: "Invalid sort_by value!" });
            }
        }

        // Find todos and apply sorting
        const sort_todos = await Todo.find().sort(sorting);
        res.json(sort_todos);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Add user authentication to ensure that only authorized users can access and modify their own todo items

// Get all todos
router.get('/', async(req, res) =>{
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json(err)
    }
})
//Get todo by id
router.get('/:id', async(req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            return res.status(404).json({err: 'Todo not found'})
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json(err)
    }
})
//Create new todo
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo)
    } catch (err) {
        res.status(500).json(err)
    }
})
// Update a todo by id
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if (!todo) {
            return res.status(404).json("Todo not found!")
        }
        res.status(201).json(todo)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a todo by id
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if(!todo) {
            res.status(400).json("Todo not found!");
        }
        res.status(204).json("Todo deleted!")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;