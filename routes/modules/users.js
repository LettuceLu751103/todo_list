const express = require('express')

const router = express.Router()


router.get('/login', (req, res) => {
  console.log('GET /login')
  res.render('login')
})


module.exports = router