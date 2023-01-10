const express = require("express");
const router = express.Router();
const shopController = require("../controller/shop");
const shopValidator = require("../validator/shop");
const stringFile = require("../common/string_file.json");

/**
 * @swagger
 * tags:
 *    name: Shops
 *    description: All shops endpoints
 */

/**
 * @swagger
 * /api/shop/createShop:
 *    post:
 *       tags: [Shops]
 *       description:
 *       summary : Create shop
 *       requestBody:
 *           content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  properties:
 *                           shop_name:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example: Pothys
 *                           shop_address_id:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           is_main:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example: Pothys
 *                           shop_user_id:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           shop_profile_img_id:
 *                             type: string
 *                             required: true
 *                             description: shop profile img id
 *                             example:
 *                           shop_business_card_url:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           shop_proof_type:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           shop_proof:
 *                             type: file
 *                             required: true
 *                             description:
 *                             example:
 *                           shop_status:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           shop_desc:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           shop_prof_sImg:
 *                             type: file
 *                             required: true
 *                             description: shop profile in small size image
 *                             example:
 *                           shop_images:
 *                             type: array
 *                             description: array of shop images
 *                             items:
 *                                 type: file
 *
 *       responses:
 *         200:
 *           description: Shop created successfully
 *
 *
 */

router.post("/createShop", shopValidator.createShop, (req, res) => {
  shopController
    .createShop(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/shop/getShopListing/{limit}/{skip}:
 *    get:
 *       tags: [Shops]
 *       description:
 *       summary: Get all shops list
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
 *           description: Shop listed successfully
 *
 *
 */

router.get("/getShopListing/:limit/:skip", (req, res) => {
  shopController
    .getShopListing(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

module.exports = router;
