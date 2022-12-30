const express = require('express')
const router = express.Router()

router.use('/user', require('./router/user'))

module.exports = router