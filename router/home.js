const express = require("express");
const router = express.Router();
const homeController = require("../controller/home");
const stringFile = require("../common/string_file.json");

/**
 * @swagger
 * tags:
 *    name: Home
 *    description: Customer home page content
 */
/**
 * @swagger
 * /api/home/landing:
 *    get:
 *       tags: [Home]
 *       description:
 *       summary : Home page content
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
 *           description: Data populated successfully
 *
 *
 */
router.get("/landing", (req, res) => {
  homeController
    .landing(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

module.exports = router;
