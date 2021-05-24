const express = require('express')

const router = express.Router()


router.get('/login', (req, res) => {
  console.log('GET /login')
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  console.log('GET /register')
  res.render('register')
})


module.exports = router