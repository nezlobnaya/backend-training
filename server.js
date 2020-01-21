const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const mongoose = require('mongoose')
const todoRoutes = express.Router()
const PORT = 4000;
const startMongoServer = require('./config/db-config')

const Todo = require('./todo.model')

startMongoServer()
app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  );

app.use(bodyParser.json())



// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true } )
// const connection = mongoose.connection

// connection.once('open', function() {
//     console.log('MongoDB database established successfully')
// })

todoRoutes.get('/', (req, res) => {
    Todo.find() 
    .then(todos => {
        res.json(todos)
    })
     .catch(err => {
         res.json(500).json({ message: 'Failed to get the todos'})
     })
    })

todoRoutes.get('/:id', (req, res) => {
    let id = req.params.id
    Todo.findById(id, function(err, todo) {
        res.json(todo)
    })
})

todoRoutes.post('/add',(req,res) => {
    let todo = new Todo (req.body)
    todo.save()
    .then(todo => {
        res.status(200).json({ 'todo': 'todo added succefully '})
    })
    .catch(err =>{
        res.status(400).send('adding new todo failed')
    })
})

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.description = req.body.description;
            todo.responsible = req.body.responsible;
            todo.priority = req.body.priority;
            todo.completed = req.body.completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/todos', todoRoutes)

app.listen(PORT, function() {
    console.log('Server is running on Port: ', + PORT)
})