const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {
  ObjectId
} = require('mongoose').Types
require('dotenv').config()
const shopModel = require('../model/shop')
const stringFile = require('../common/string_file.json')
const commonFunction = require('../common/common_function')

const createShop = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = req.body
      let id = await commonFunction.getNextId(shopModel);
      let shop = new shopModel({
        id,
        shop_name: commonFunction.trim(commonFunction.toLowerCase(body.shop_name)),
        shop_address_id: body.shop_address_id,
        is_main: body.is_main,
        shop_user_id: body.shop_user_id,
        shop_profile_img_id: body.shop_profile_img_id,
        shop_business_card_url: body.shop_business_card_url,
        shop_proof_type: body.shop_proof_type,
        shop_proof: body.shop_proof,
        shop_status: body.shop_status,
        shop_desc: body.shop_desc,
        shop_prof_sImg: body.shop_prof_sImg,
        shop_images: body.shop_images,
      })
      await shop.save().catch(e => reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      }))
      resolve({
        status: stringFile.STATUS_ERROR,
        message: stringFile.SUCCESS_MESSAGE
      })
    } catch (e) {
      reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      })
    }
  })
}

const getShopListing = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let limit = req.params.limit ? parseInt(req.params.limit) : stringFile.LIMIT
      let skip = req.params.skip ? parseInt(req.params.skip) : stringFile.SKIP
      let response = await shopModel.aggregate([{
        $facet: {
          list: [{
            $sort: {
              shop_name: 1
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
        message: stringFile.SHOP_LISTED_SUCCESS,
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
  createShop,
  getShopListing
}