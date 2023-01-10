const {
  ObjectId
} = require('mongoose').Types
require('dotenv').config()
const ProductModel = require('../model/product')
const stringFile = require('../common/string_file.json')
const commonFunction = require('../common/common_function')

const createProduct = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = req.body
      let id = await commonFunction.getNextId(ProductModel);
      let product = new ProductModel({
        id: id,
        pro_name: commonFunction.trim(commonFunction.toLowerCase(body.pro_name)),
        pro_desc: commonFunction.trim(commonFunction.toLowerCase(body.pro_desc)),
        pro_short_desc: commonFunction.trim(commonFunction.toLowerCase(body.pro_short_desc)),
        pro_price: body.pro_price,
        pro_mrp: body.pro_mrp,
        pro_disc_value: body.pro_disc_value,
        pro_disc_type: body.pro_disc_type,
        pro_disc_val: body.pro_disc_val,
        pro_status: body.pro_status,
        cat_id: body.cat_id,
        pro_sku: body.pro_sku,
        pro_features: body.pro_features,
        pro_variants: body.pro_variants,
        pro_in_pack: body.pro_in_pack
      })
      await product.save().catch(e => reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      }))
      resolve({
        status: stringFile.STATUS_SUCCESS,
        message: stringFile.PRODUCT_SUCCESS_MESSAGE
      })
    } catch (e) {
      reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      })
    }
  })
}

const getProductListing = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = req.body
      let match = {}
      if(req.query.cat_id){
        let cat_id = !isNaN(req.query.cat_id) ? req.query.cat_id : parseInt(req.query.cat_id)
        match = {cat_id: {$eq: cat_id}}
      }
      let limit = req.params.limit ? parseInt(req.params.limit) : stringFile.LIMIT
      let skip = req.params.skip ? parseInt(req.params.skip) : stringFile.SKIP
      let response = await ProductModel.aggregate([{$match:match},{
        $facet: {
          list: [{
            $sort: {
              pro_name: 1
            }
          }, {
            $limit: limit
          }, {
            $skip: skip
          }],
          count: [{ $count: "total" }]
        }
      }]).catch(e => reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      }))
      response = response[0]
      resolve({
        status: stringFile.STATUS_SUCCESS,
        data: {
          list: response.list ? response.list : [],
          count: response.count && response.count.length && response.count[0].total ? response.count[0].total : 0
        },
        message: stringFile.PRODUCT_LISTED_SUCCESS,
        banner_content: {
          
        },
        ad_content: {
          
        }
      })
    } catch (e) {
      reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      })
    }
  })
}


module.exports = {
  createProduct,
  getProductListing
}