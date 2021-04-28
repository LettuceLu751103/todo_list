
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {

  res.send('Hello World')
})



app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
  // console.log(db)
})