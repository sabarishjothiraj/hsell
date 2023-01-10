const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const productValidator = require("../validator/product");
const stringFile = require("../common/string_file.json");

/**
 * @swagger
 * tags:
 *    name: Products
 *    description: All products endpoints
 */
/**
 * @swagger
 * /api/product/createProduct:
 *    post:
 *       tags: [Products]
 *       description:
 *       summary : Create Product
 *       requestBody:
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                           pro_name:
 *                             type: string
 *                             required: true
 *                             description: Product name
 *                             example: t-shirt
 *                           pro_desc:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_short_desc:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_price:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_mrp:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_disc_value:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_disc_val:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_status:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           cat_id:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_sku:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_features:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_variants:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           pro_in_pack:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *
 *       responses:
 *         200:
 *           description: Product created successfully
 *
 *
 */

router.post("/createProduct", productValidator.createProduct, (req, res) => {
  productController
    .createProduct(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/product/getProductListing/{limit}/{skip}:
 *    get:
 *       tags: [Products]
 *       description:
 *       summary: Get all products list
 *       parameters:
 *         - name: limit
 *           in: path
 *           type: string
 *           required: true
 *           example: 10
 *         - name: skip
 *           in: path
 *           schema:
 *             type: string
 *             example: 0
 *           required: true
 *       responses:
 *         200:
 *           description: Products listed successfully
 *
 *
 */

router.get("/getProductListing/:limit/:skip", (req, res) => {
  productController
    .getProductListing(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

module.exports = router;
