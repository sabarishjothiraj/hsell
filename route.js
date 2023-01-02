const express = require('express')
const router = express.Router()

router.use('/user', require('./router/user'))
router.use('/product', require('./router/product'))
router.use('/shop', require('./router/shop'))
router.use('/category', require('./router/category'))

module.exports = router