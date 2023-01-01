const express = require('express')
const router = express.Router()
const categoryController = require('../controller/category')
const categoryValidator = require('../validator/category')
const stringFile = require('../common/string_file.json')

router.post('/createCategory', categoryValidator.createCategory, (req, res) => {
  categoryController.createCategory(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.get('/getCategoryListing/:limit/:skip', (req, res) => {
  categoryController.getCategoryListing(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

module.exports = router