const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const stringFile = require('./string_file.json')
const UserModel = require('../model/user')
require('dotenv').config()
const nodemailer = require("nodemailer");

exports.JwtVerification = (req, res, next) => {
  let splited = req.path.split('/')
  if (process.env.JWT_EXEPTIONAL_URL.includes(req.path) || splited[1] == 'file') {
    next()
  } else {
    jwt.verify(req.headers.authorization, process.env.AUTH_KEY, (err, result) => {
      if (err) {
        return res.status(stringFile.AUTHORIZATION_ERROR_STATUS_CODE).send({
          message: stringFile.UNAUTHORISED_ACCESS_MESSAGE
        })
      } else {
        req.authBody = result
        next()
      }
    })
  }
}

exports.connectDatabase = () => {
  mongoose.set('strictQuery', true)
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000
  })
}

exports.capitalise = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

exports.validateNonEmptyString = (string) => {
  return string.trim() != ""
}

exports.toLowerCase = (string) => {
  return string.toLowerCase()
}

exports.trim = (string) => {
  return string.trim()
}

exports.connectMailService = () => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: "jkarthikeyan003@gmail.com", // EMAIL
        pass: "wfdphckxpwnwtzfk", // APP PASSWORD
      },
    });
    return transporter;
  } catch (nodemailCatch) {
    console.log("nodemailCatch", nodemailCatch)
  }
}

exports.getNextId = async (table_name) => {
    return await UserModel.findOne()
      .sort({user_id: -1})
      .limit(1)
      .then(user => {
        console.log(user)
        if (user != null) {
          return (user.user_id + 1);
        } else {
          return 1;
        }
      });
}