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
      let category_id = await commonFunction.getNextId(CategoryModel);
      let category = new CategoryModel({
        cat_id: category_id,
        cat_name: commonFunction.trim(commonFunction.toLowerCase(body.cat_name)),
        cat_parent_id: body.cat_parent_id,
        cat_desc: "",
        cat_sIcon: "",
        cat_mIcon: "",
        cat_laIcon: "",
      })
      resolve({
        message: stringFile.SUCCESS_MESSAGE
      })
    } catch (e) {
      reject({
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
          count: {
            $count: "total"
          }
        }
      }]).catch(e => reject({
        message: e.message
      }))
      response = response[0]
      resolve({
        list: response.list ? response.list : [],
        count: response.count && response.count.length && response.count[0].total ? response.count[0].total : 0
      })
    } catch (e) {
      reject({
        message: e.message
      })
    }
  })
}


module.exports = {
  createCategory,
  getCategoryListing
}