const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  id: {
    type: Number
  },
  cat_name: {
    type: String,
    unique: true
  },
  cat_parent_id: {
    type: String
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
const CategoryModel = mongoose.model('category', categorySchema)
module.exports = CategoryModel