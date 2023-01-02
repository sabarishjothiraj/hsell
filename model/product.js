const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: {
    type: String
  },
  pro_name: {
    type: String
  },
  pro_desc: {
    type: String
  },
  pro_short_desc: {
    type: String
  },
  pro_price: {
    type: Number
  },
  pro_mrp: {
    type: Number
  },
  pro_disc_value: {
    type: Number
  },
  pro_disc_type: {
    type: String
  },
  pro_disc_val: {
    type: String
  },
  pro_status: {
    type: Boolean
  },
  cat_id: {
    type: Number
  },
  pro_sku: {
    type: String
  },
  pro_features: {
    type: String
  },
  pro_variants: {
    type: String
  },
  pro_in_pack: {
    type: String
  }

}, {
  timestamps: true
})
const ProductModel = mongoose.model('product', productSchema)
module.exports = ProductModel