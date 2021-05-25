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
  const { name, email, password, confirmPassword } = req.body
  console.log(`name: ${name}, email: ${email}, password: ${password}`)
  User.findOne({ email: email })
    .then(userData => {
      if (userData) {
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({ name: name, email: email, password: password })
          .then(result => {
            console.log(result)

          })
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
module.exports = router