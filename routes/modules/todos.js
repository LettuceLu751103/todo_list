const express = require('express')

const routers = express.Router()

const Todo = require('../../models/todo')

routers.get('/new', (req, res) => {
  res.render('new')
})

routers.post('/', (req, res) => {
  console.log(req.body)
  const name = req.body
  return Todo.create(name)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })


})

routers.get('/:id', (req, res) => {
  return Todo.findById(req.params.id)
    .lean()
    .then((todo) => {
      res.render('detail', { todo })
    })
    .catch(error => {
      console.log(error)
    })

})

routers.get('/:id/edit', (req, res) => {
  const id = req.params.id
  console.log(id)
  Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('edit', { todo })
    })
    .catch(error => {
      console.log(error)
    })

})

routers.put('/:id', (req, res) => {
  const id = req.params.id
  // const name = req.body.name
  // const isDone = req.body.isDone
  // 改成解構賦值方式
  console.log(req.body)
  const { name, isDone } = req.body
  Todo.findById(id)
    .then(todo => {

      todo.name = name
      todo.isDone = isDone === 'on'

      todo.save()

    })
    .then(() =>
      res.redirect(`/todos/${id}`)
    )
    .catch(error => {
      console.log(error)
    })
})

routers.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
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