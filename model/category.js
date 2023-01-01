const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  cat_id: {
    type: Number
  },
  cat_name: {
    type: String
  },
  cat_parent_id: {
    type: mongoose.Types.ObjectId
  },
  cat_desc: {
    type: String
  },
  cat_sIcon: {
    type: String
  },
  cat_mIcon: {
    type: String
  },
  cat_laIcon: {
    type: String
  },
  cat_isEnabled: {
    type: Boolean,
    default: false
  },
  cat_isVisible: {
    type: Boolean,
    default: false
  },
  cat_showOnProfile: {
    type: Boolean,
    default: false
  },
  submenu_visible: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
}) 
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel