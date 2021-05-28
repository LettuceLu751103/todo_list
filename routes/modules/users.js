const express = require('express')

const router = express.Router()

const User = require('../../models/user')

// 引用 passport
const passport = require('passport')

router.get('/login', (req, res) => {
  console.log('GET /login')
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  console.log('GET /register')
  res.render('register')
})

router.post('/register', (req, res) => {
  console.log('POST /register')
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  console.log(`name: ${name}, email: ${email}, password: ${password}`)
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email: email })
    .then(userData => {
      if (userData) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({ name: name, email: email, password: password })
          .then(() => {
            res.redirect('/')
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    .catch(err => {
      console.log(err)
    })

})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})
module.exports = router