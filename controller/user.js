const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {
  ObjectId
} = require('mongoose').Types
require('dotenv').config()
const UserModel = require('../model/user')
const stringFile = require('../common/string_file.json')
const commonFunction = require('../common/common_function')

// API WITH BODY USED
const login = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = req.body
      body.user_email = body.user_email.trim()
      const loginResponse = await UserModel.findOneAndUpdate({
        $and: [{
          $or: [{
            user_email: body.user_email.toLowerCase()
          }, {
            user_email: body.user_email.toUpperCase()
          }]
        }, {
          password: md5(body.password)
        }]
      }, {
        $set: {
          last_logged_in: new Date()
        }
      }, {
        new: true
      }).lean().catch(err => reject({
        message: err.message
      }))
      const jwtBody = {
        user_fname: loginResponse.user_fname,
        user_email: loginResponse.user_email,
        user_phone: loginResponse.user_phone,
        user_id: loginResponse.user_id,
        _id: loginResponse._id,
        readOnly: loginResponse.readOnly
      }
      resolve({
        _id: loginResponse._id,
        message: stringFile.SUCCESS_MESSAGE,
        token: jwt.sign(jwtBody, `${process.env.AUTH_KEY}`),
        name: loginResponse.name,
        colour: loginResponse.colour,
        photo: loginResponse.photo,
        readOnly: loginResponse.readOnly
      })
    } catch (e) {
      reject({
        message: e.message
      })
    }
  })
}

const signUp = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = req.body
      let userResponse = await UserModel.create({
        user_fname: commonFunction.trim(commonFunction.toLowerCase(body.user_fname)),
        user_lname: commonFunction.trim(commonFunction.toLowerCase(body.user_lname)),
        user_email: commonFunction.trim(commonFunction.toLowerCase(body.user_email)),
        user_phone: commonFunction.trim(commonFunction.toLowerCase(body.user_phone)),
        user_gender: commonFunction.trim(commonFunction.toLowerCase(body.user_gender)),
        user_type: commonFunction.trim(commonFunction.toLowerCase(body.user_type)),
        user_password: md5(commonFunction.trim(req.body.user_password)),
        user_id: commonFunction.getNextId('users'),
      }).catch(e => reject({
        message1: e.message
      }))
      const jwtBody = {
        user_fname: userResponse.user_fname,
        user_email: userResponse.user_email,
        user_phone: userResponse.user_phone,
        user_id: userResponse.user_id,
        _id: userResponse._id
      }
      resolve({
        _id: userResponse._id,
        message: stringFile.SUCCESS_MESSAGE,
        token: jwt.sign(jwtBody, `${process.env.AUTH_KEY}`),
        user_fname: userResponse.user_fname,
        user_email: userResponse.user_email,
        user_phone: userResponse.user_phone,
        user_gender: userResponse.user_gender,
        user_type: userResponse.user_type,
        user_id: userResponse.user_id,
      })
    } catch (e) {
      reject({
        message2: e.message
      })
    }
  })
}

const resetPassword = req => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = req.body
      let user = await UserModel.findOneAndUpdate({
        _id: ObjectId(body.userId)
      }, {
        $set: {
          password: md5(commonFunction.trim(body.password)),
        }
      }, {
        new: true,
      }).catch(e => reject({
        message: e.message
      }))
      let jwtBody = {
        name: user.name,
        _id: user._id
      }
      resolve({
        _id: user._id,
        message: stringFile.SUCCESS_MESSAGE,
        token: jwt.sign(jwtBody, `${process.env.AUTH_KEY}`),
        name: user.name
      })
    } catch (error) {
      reject({
        error: error.message
      })
    }
  })
}

const forgotPassword = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = req.body
      let userResponse = await UserModel.findOne({
        user_email: body.user_email
      }, {
        user_email: 1,
        _id: 1
      }).lean().catch(err => reject({
        message: err.message
      }))
      let otp = `${ Math.floor( 1000 + Math.random() * 9000 )}`
      await req.mailer.sendMail({
        from: 'HSEL Team',
        to: userResponse.user_email,
        subject: "Forgot password",
        text: `Hi, Your OTP to update password`,
        html: `Your OTP to update password ${otp} `
      });
      resolve({
        message: stringFile.SUCCESS_MESSAGE,
        otp
      })
    } catch (e) {
      reject({
        message: e.message
      })
    }
  })
}

// FACET PIPELINE USED TO GET LIST AND COUNT IN SINGLE QUERY
// API WITH PARAM USED
const getAllUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = req.body
      let limit = req.params.limit ? parseInt(req.params.limit) : stringFile.LIMIT
      let skip = req.params.skip ? parseInt(req.params.skip) : stringFile.SKIP
      let response = await UserModel.aggregate([{
        $facet: {
          list: [{
            $skip: skip
          }, {
            $limit: limit
          }],
          count: [{
            $count: "totalCount"
          }]
        }
      }]).catch(err => reject({
        message: err.message
      }))
      response = response[0]
      resolve({
        list: response.list ? response.list : [],
        count: response.count && response.count.lenght && response.count[0].totalCount ? response.count[0].totalCount : 0
      })
    } catch (e) {
      reject({
        message: e.message
      })
    }
  })
}

// API WITH QUERY PARAM USED
const deleteUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = req.query
      await UserModel.deleteOne({
        _id: ObjectId(body.userId)
      }).catch(e => reject({
        message: e.message
      }))
      resolve({
        message: stringFile.SUCCESS_MESSAGE
      })
    } catch (e) {
      reject({
        message: e.message
      })
    }
  })
}

module.exports = {
  login,
  signUp,
  forgotPassword,
  resetPassword,
  getAllUser,
  deleteUser
}