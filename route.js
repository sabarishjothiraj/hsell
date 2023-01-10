const express = require("express");
const router = express.Router();

/**
 * @swagger
 *   components:
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *     responses:
 *        UnauthorizedError:
 *           description: Provide Authorization details
 */

/**
 * @swagger
 *  security:
 *     - bearerAuth: []
 */
router.use("/user", require("./router/user"));
router.use("/product", require("./router/product"));
router.use("/shop", require("./router/shop"));
router.use("/category", require("./router/category"));
router.use("/home", require("./router/home"));

module.exports = router;
