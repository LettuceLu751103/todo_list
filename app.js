
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// 配置網頁模板區域
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

require('./config/mongoose')

app.use(routes)


app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
  // console.log(db)
})