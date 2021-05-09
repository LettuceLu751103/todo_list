const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'desc' })
    .then(todo => {
      res.render('index', { todos: todo })
    })
    .catch(error => {
      console.log(error)
    })

})


module.exports = router