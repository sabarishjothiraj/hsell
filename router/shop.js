const express = require('express')
const router = express.Router()
const shopController = require('../controller/shop')
const shopValidator = require('../validator/shop')
const stringFile = require('../common/string_file.json')

router.post('/createShop', shopValidator.createShop, (req, res) => {
  shopController.createShop(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.get('/getShopListing/:limit/:skip', (req, res) => {
  shopController.getShopListing(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

module.exports = router