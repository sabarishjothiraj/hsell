const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const userValidator = require('../validator/user')
const stringFile = require('../common/string_file.json')

router.put('/login', userValidator.login, (req, res) => {
  userController.login(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.post('/signUp', userValidator.signUp, (req, res) => {
  userController.signUp(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.post('/forgotPassword', userValidator.forgotPassword, (req, res) => {
  userController.forgotPassword(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.post('/resetPassword', userValidator.resetPassword, (req, res) => {
  userController.resetPassword(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.get('/getAllUser/:limit/:skip', (req, res) => {
  userController.getAllUser(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.get('/profile/:id', (req, res) => {
  userController.profile(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

router.delete('/deleteUser', (req, res) => {
  userController.deleteUser(req).then((data) => {
    res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
  }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err))
})

module.exports = router