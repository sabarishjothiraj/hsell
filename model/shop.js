const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
  id: {
      type: Number
  },
  shop_name: {
      type: String
  },
  shop_address_id: {
      type: String
  },
  is_main: {
    type: Boolean,
    default: false
  },
  shop_user_id: {
      type: Number
  },
  shop_profile_img_id: {
      type: Number
  },
  shop_business_card_url: {
      type: String
  },
  shop_proof_type: {
      type: String
  },
  shop_proof: {
      type: String
  },
  shop_status: {
      type: Boolean,
      default: false
  },
  shop_desc: {
      type: String
  },
  shop_prof_sImg: {
      type: String
  },
  shop_images: {
      type: Array,
      default: []
  }
}, {
  timestamps: true
}) 
const ShopModel = mongoose.model('shop', shopSchema)
module.exports = ShopModel