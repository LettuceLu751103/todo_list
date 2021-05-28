const express = require('express')

const routers = express.Router()

const Todo = require('../../models/todo')

routers.get('/new', (req, res) => {
  res.render('new')
})

routers.post('/', (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const userId = req.user._id
  return Todo.create({ name, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })


})

routers.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => {
      res.render('detail', { todo })
    })
    .catch(error => {
      console.log(error)
    })

})

routers.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .lean()
    .then(todo => {
      res.render('edit', { todo })
    })
    .catch(error => {
      console.log(error)
    })

})

routers.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  // 改成解構賦值方式
  const { name, isDone } = req.body
  Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.userId = userId
      todo.save()
    })
    .then(() =>
      res.redirect(`/todos/${_id}`)
    )
    .catch(error => {
      console.log(error)
    })
})

routers.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .then(todo => {
      todo.remove()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = routers