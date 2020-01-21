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
app.use(cors())
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

todoRoutes.post('/add', (req,res) => {
    let todo = new Todo (req.body)
    todo.save()
    .then(todo => {
        res.status(200).json({ 'todo': 'todo added succefully '})
    })
    .catch(err =>{
        res.status(400).send('adding new todo failed')
    })
})

todoRoutes.put('/update/:id', (req,res) => {
    let id = req.params.id 
    const changes = req.body
    Todo.findById(id)
    .then(todo => {
        if (todo) {
            Todo.update(changes, id)
            .then (updatedToDo => {
                res.json(updatedToDo)
            })
        } else {
            res.status(404).send('data is not found')
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create a todo'})
    })
})

app.use('/todos', todoRoutes)

app.listen(PORT, function() {
    console.log('Server is running on Port: ', + PORT)
})