const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo');
const { error } = require('console');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://dino:trong@cluster0.y1s9d3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conected to MongoDB Atlas')
}).catch((error) => {
    console.log("Error conecting: ", error)
})

app.use(express.json());
app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}` )
})