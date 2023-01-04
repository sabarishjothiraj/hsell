const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {
  ObjectId
} = require('mongoose').Types
require('dotenv').config()
const CategoryModel = require('../model/category')
const stringFile = require('../common/string_file.json')
const commonFunction = require('../common/common_function')

const createCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = req.body
      let id = await commonFunction.getNextId(CategoryModel);
      let category = new CategoryModel({
        id: id,
        cat_name: commonFunction.trim(commonFunction.toLowerCase(body.cat_name)),
        cat_parent_id: body.cat_parent_id,
        cat_desc: "",
        cat_sIcon: "",
        cat_mIcon: "",
        cat_laIcon: "",
      })
      await category.save().catch(e => reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      }))
      resolve({
        status: stringFile.STATUS_SUCCESS,
        message: stringFile.CATEGORY_SUCCESS_MESSAGE
      })
    } catch (e) {
      reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      })
    }
  })
}

const getCategoryListing = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = req.body
      let limit = req.params.limit ? parseInt(req.params.limit) : stringFile.LIMIT
      let skip = req.params.skip ? parseInt(req.params.skip) : stringFile.SKIP
      let response = await CategoryModel.aggregate([{
        $facet: {
          list: [{
            $sort: {
              cat_name: 1
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
        message: stringFile.CATEGORY_LISTED_SUCCESS,
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

const getCategoryDetails = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = req.params
      let response = await CategoryModel.findOne({_id:ObjectId(body.id)}).catch(e=> reject({
        message: e.message
      }))
      resolve(response)
    } catch (e) {
      reject({
        message: e.message
      })
    }
  })
}


module.exports = {
  createCategory,
  getCategoryListing,
  getCategoryDetails
}