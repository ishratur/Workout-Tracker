const express = require('express')
const {loginUser, signupUser} = require('../Controller/userController')

const router = express()

// login
router.post('/login', loginUser)

// signup
router.post('/signup', signupUser)

module.exports = router 