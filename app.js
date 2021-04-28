
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const Todo = require('./models/todo')
const bodyParser = require('body-parser')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// 配置網頁模板區域
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todo => {
      res.render('index', { todos: todo })
    })
    .catch(error => {
      console.log(error)
    })

})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
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

app.get('/todos/:id', (req, res) => {
  return Todo.findById(req.params.id)
    .lean()
    .then((todo) => {
      res.render('detail', { todo })
    })
    .catch(error => {
      console.log(error)
    })

})

app.get('/todos/:id/edit', (req, res) => {
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

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.save()

    })
    .then(() =>
      res.redirect(`/todos/${id}`)
    )
    .catch(error => {
      console.log(error)
    })
})

app.post('/todos/:id/delete', (req, res) => {
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
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
  // console.log(db)
})