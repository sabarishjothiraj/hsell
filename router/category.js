const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");
const categoryValidator = require("../validator/category");
const stringFile = require("../common/string_file.json");

/**
 * @swagger
 * tags:
 *    name: Category
 *    description: All category endpoints
 */
/**
 * @swagger
 * /api/category/createCategory:
 *    post:
 *       tags: [Category]
 *       description:
 *       summary : Create Category
 *       requestBody:
 *           content:
 *              multipart/form-data:
 *                schema:
 *                  type: object
 *                  properties:
 *                           cat_name:
 *                             type: string
 *                             required: true
 *                             description: Product name
 *                             example: mobile
 *                           cat_parent_id:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example: Electronics
 *                           cat_desc:
 *                             type: string
 *                             required: true
 *                             description:
 *                             example:
 *                           cat_sIcon:
 *                             type: file
 *                             required: true
 *                             description:
 *                             example: Pothys
 *                           cat_mIcon:
 *                             type: file
 *                             required: true
 *                             description:
 *                             example:
 *                           cat_laIcon:
 *                             type: file
 *                             required: true
 *                             description:
 *                             example:
 *       responses:
 *         200:
 *           description: Category created successfully
 *
 *
 */
router.post("/createCategory", categoryValidator.createCategory, (req, res) => {
  categoryController
    .createCategory(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/category/getCategoryListing/{limit}/{skip}:
 *    get:
 *       tags: [Category]
 *       description:
 *       summary: Get all categories list
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
 *           description: Categories listed successfully
 *
 *
 */
router.get("/getCategoryListing/:limit/:skip", (req, res) => {
  categoryController
    .getCategoryListing(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/category/getCategoryDetails/{id}:
 *    get:
 *       tags: [Category]
 *       description:
 *       summary: Get all categories list
 *       parameters:
 *         - name: id
 *           in: path
 *           type: string
 *           required: true
 *           example: 6
 *       responses:
 *         200:
 *           description: Category details fetched successfully
 *
 *
 */
router.get("/getCategoryDetails/:id", (req, res) => {
  categoryController
    .getCategoryDetails(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

module.exports = router;
