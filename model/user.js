const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true
  },
  user_name: {
    type: String,
    // required: true
  },
  user_lname: {
    type: String,
    // required: true
  },
  user_password: {
    type: String,
    // required: true
  },
  user_email: {
    // unique: true,
    type: String,
    // required: true
  },
  user_phone: {
    unique: true,
    type: String,
    required: true
  },
  user_gender: {
    type: String,
    enum: ['M','F','O'],
    default: 'M'
  },
  user_type: {
    type: String,
    enum: ['B','S'],
    default: 'B'
  },
  user_status: {
    type: String,
    enum: ['A','I'],
    default: 'A'
  },
  user_verify_otp: {
    type: String
  },
  user_dob: Date,
  user_last_logged: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
})
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel