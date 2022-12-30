const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  user_id: Number,
  user_fname: {
    type: String,
    required: true
  },
  user_lname: {
    type: String,
    required: true
  },
  user_email: {
    unique: true,
    type: String,
    required: true
  },
  user_phone: {
    unique: true,
    type: String,
    required: true
  },
  user_gender: {
    type: String,
    required: true
  },
  user_password: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    required: true
  },
  user_status: {
    type: String,
    enum: ['A','I'],
    default: 'A'
  },
  user_dob: Date,
  user_email_verify_token: String,
  user_last_loggedin: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
})
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel