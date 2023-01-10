const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();
const UserModel = require("../model/user");
const ProductModel = require("../model/product");
const CategoryModel = require('../model/category')
const stringFile = require("../common/string_file.json");
const commonFunction = require("../common/common_function");

// FACET PIPELINE USED TO GET LIST AND COUNT IN SINGLE QUERY
// API WITH PARAM USED
const landing = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = req.body;
      // banner_content
      // category
      // recent product
      match = {'$and': [
        { "cat_is_enabled": {$eq: "Y"} },
        { "cat_is_visible": {$eq: "Y"} }
      ]}
      let categories = await CategoryModel.aggregate([{$match:match},{
        $facet: {
          list: [{
            $sort: {
              cat_name: 1
            }
          }],
          count: [{ $count: "total" }]
        }
      }]).catch(e => reject({
        status: stringFile.STATUS_ERROR,
        message: e.message
      }))
      categories = categories[0];
      let products = new Array();
      var list = new Array();

      if (categories.list.length > 0) {
        // await categories.list.forEach(function(data, index) {
        await Promise.all(list.map(async (data, index) => {
          match = {'$and': [
            { "cat_id": {$eq: data['cat_id']} }
          ]}
          let product_list = await ProductModel.aggregate([
            { $match:match },
            { $sort: { created_date: 1 } }, 
            { $limit: 4 }
          ]).catch(e => reject({
            status: stringFile.STATUS_ERROR,
            message: e.message
          }))

          list[data.cat_id] = product_list;
          console.log(list)
          products.push(list);
        }));
      }



      resolve({
        data: {
          categories,
          products,
          banner_content: {},
          ad_content: {},
        }
      });
    } catch (e) {
      reject({
        message: e.message,
      });
    }
  });
};

module.exports = {
  landing,
};
