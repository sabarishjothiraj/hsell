const {
  check,
  validationResult,
  query
} = require('express-validator')
const stringFile = require('../common/string_file.json')
const UserModel = require('../model/user')
const md5 = require('md5')
const {
  ObjectId
} = require('mongoose').Types


exports.config = [
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.login = [
  check('user_email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID),
  check('user_password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY).matches(/^.{6,20}$/, 'i').withMessage(stringFile.PASSWORD_VALIDATION_MESSAGE),
  check('user_email').custom(async (value) => {
    const user = await UserModel.findOne({
      user_email: value.toLowerCase().trim()
    }, {
      _id: 1
    }).lean().catch(e => {
      throw Error(e.message)
    })
    if (!user) throw Error(stringFile.WRONG_EMAIL)
    else return true
  }),
  check('user_password').custom(async (value, {
    req
  }) => {
    const user = await UserModel.findOne({
      user_email: req.body.user_email.toLowerCase(),
      user_password: md5(value)
    }, {
      _id: 1,
      user_status: 1
    }).lean().catch(e => {
      throw Error(e.message)
    })
    if (!user) throw Error(stringFile.WRONG_PASSWORD)
    else if (user.user_status != 'A') throw Error(stringFile.INACTIVE_USER)
    else return true
  }),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.verifyPhone = [
  check('user_phone').not().isEmpty().withMessage(stringFile.PHONE_NOT_EMPTY),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.verifyLoginOtp = [
  check('user_phone').not().isEmpty().withMessage(stringFile.PHONE_NOT_EMPTY),
  check('user_verify_otp').not().isEmpty().withMessage(stringFile.OTP_NOT_EMPTY),
  check('user_phone').custom(async (value) => {
    const user = await UserModel.findOne({
      user_phone: value.toLowerCase().trim()
    }, {
      _id: 1
    }).lean().catch(e => {
      throw Error(e.message)
    })
    if (!user) throw Error(stringFile.WRONG_PHONE)
    else return true
  }),
  check('user_verify_otp').custom(async (value, {
    req
  }) => {
    const user = await UserModel.findOne({
      user_phone: req.body.user_phone.trim(),
      user_verify_otp: value
    }, {
      _id: 1,
      user_status: 1
    }).lean().catch(e => {
      throw Error(e.message)
    })
    if (!user) throw Error(stringFile.WRONG_OTP)
    else if (user.user_status != 'A') throw Error(stringFile.INACTIVE_USER)
    else return true
  }),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.updateUserDetail = [
  check('user_email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID),
  check('user_name').not().isEmpty().withMessage(stringFile.NAME_NOT_EMPTY),
  check('user_email').custom(async (value, {
    req
  }) => {
    const user = await UserModel.findOne({
      user_id: { $ne: req.body.user_id },
      user_email: value.toLowerCase().trim()
    }, {
      _id: 1,
      user_status: 1
    }).lean().catch(e => {
      throw Error(e.message)
    })
    if (user) throw Error(stringFile.EMAIL_ALREADY_EXISTS)
    else return true
  }),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.updateUserCity = [
  check('user_city_id').not().isEmpty().withMessage(stringFile.CITY_NOT_EMPTY),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.signUp = [
  check('user_email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID),
  check('user_fname').not().isEmpty().withMessage(stringFile.NAME_NOT_EMPTY),
  check('user_lname').not().isEmpty().withMessage(stringFile.NAME_NOT_EMPTY),
  check('user_phone').not().isEmpty().withMessage(stringFile.NAME_NOT_EMPTY),
  check('user_type').not().isEmpty().withMessage(stringFile.NAME_NOT_EMPTY),
  check('user_password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY).matches(/^.{6,20}$/, 'i').withMessage(stringFile.PASSWORD_VALIDATION_MESSAGE),
  check('user_email').custom(async (value) => {
    const user = await UserModel.findOne({
      user_email: value.toLowerCase().trim()
    }, {
      _id: 1
    }).lean().catch(e => {
      throw Error(e.message)
    })
    if (user) throw Error(stringFile.EMAIL_ALREADY_EXISTS)
    else return true
  }),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.forgotPassword = [
  check('user_email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID),
  check('user_email').custom(async (value) => {
    const user = await UserModel.findOne({
      user_email: value.toLowerCase().trim()
    }, {
      _id: 1
    }).lean().catch(e => {
      throw Error(e.message)
    })
    if (!user) throw Error(stringFile.WRONG_EMAIL)
    else return true
  }),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]

exports.resetPassword = [
  check('userId').not().isEmpty().withMessage(stringFile.USER_ID_MUST_NOT_EMPTY),
  check('password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY),
  check('userId').custom(async (value) => {
    if (!ObjectId.isValid(value)) throw Error(stringFile.PROVIDE_VALID_USER_ID)
    else return true
  }),
  (req, res, next) => {
    const errorValidation = validationResult(req)
    if (!errorValidation.isEmpty()) {
      return res.status(422).send({
        message: errorValidation.errors.shift().msg
      })
    }
    next()
  }
]
