const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const productValidator = require('../validator/product')
const stringFile = require('../common/string_file.json')

router.post('/createProduct', productValidator.createProduct, (req, res) => {
  productController.createProduct(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.get('/getProductListing/:limit/:skip', (req, res) => {
  productController.getProductListing(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

module.exports = router