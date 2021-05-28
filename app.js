
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// 配置網頁模板區域
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



// 設定 express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))

require('./config/mongoose')

// usePassport 要放在 express-session 之後
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  // 這個 middleware 是為了帶資料給所有 res
  // console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)


app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
  // console.log(db)
})