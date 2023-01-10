const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const userValidator = require("../validator/user");
const stringFile = require("../common/string_file.json");

/**
 * @swagger
 * /api/user/config:
 *    get:
 *      tags: [Users]
 *      description: city
 *      summary : city
 *      security: []
 *      responses:
 *         200:
 *           description:
 *
 */
router.get("/config", userValidator.config, (req, res) => {
  userController
    .config(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 *@swagger
 * components:
 *    schemas:
 *       user:
 *        type: object
 *        properties:
 *             user_email:
 *               type: string
 *               description: enter user id
 *               example: '23'
 *
 */

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: All shop endpoints
 */

/**
 * @swagger
 * /api/user/login:
 *    post:
 *      tags: [Users]
 *      description: Customer login endpoint
 *      summary : don't use this
 *      security: []
 *      responses:
 *         200:
 *           description: Logged in successfully
 *      requestBody:
 *          content:
 *               application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/user'
 *
 */
router.post("/login", userValidator.login, (req, res) => {
  userController
    .login(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/user/verifyPhone:
 *    post:
 *       tags: [Users]
 *       description:
 *       summary : Verify Mobile number
 *       security: []
 *       requestBody:
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                       user_phone:
 *                            type: string
 *                            required: true
 *                            description: mobile number
 *                            example: 9988998899
 *       responses:
 *         200:
 *           description: Mobile number verified successfully
 *
 *
 */
router.post("/verifyPhone", userValidator.verifyPhone, (req, res) => {
  userController
    .verifyPhone(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/user/verifyLoginOtp:
 *    post:
 *       tags: [Users]
 *       description:
 *       summary : Verify Mobile number with OTP
 *       security: []
 *       requestBody:
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                       user_phone:
 *                            type: string
 *                            required: true
 *                            description: mobile number
 *                            example: 9988998899
 *                       user_verify_otp:
 *                            type: string
 *                            required: true
 *                            description: enter OTP
 *                            example: 1234
 *       responses:
 *         200:
 *           description: Mobile number verified successfully
 *
 *
 */
router.post("/verifyLoginOtp", userValidator.verifyLoginOtp, (req, res) => {
  userController
    .verifyLoginOtp(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/user/updateUserDetail:
 *    post:
 *       tags: [Users]
 *       description:
 *       summary : Update user details
 *       requestBody:
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                       user_id:
 *                            type: string
 *                            required: true
 *                            description: mobile number
 *                            example: 9988998899
 *                       user_name:
 *                            type: string
 *                            required: true
 *                            description: enter OTP
 *                            example: User Name
 *                       user_email:
 *                            type: string
 *                            required: true
 *                            description: enter OTP
 *                            example: username@email.com
 *       responses:
 *         200:
 *           description: Mobile number verified successfully
 *
 *
 */
router.post("/updateUserDetail", userValidator.updateUserDetail, (req, res) => {
  userController
    .updateUserDetail(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/user/updateUserCity:
 *    post:
 *       tags: [Users]
 *       description:
 *       summary : Update customer city
 *       requestBody:
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                       user_id:
 *                            type: int
 *                            required: true
 *                            description: user_id
 *                            example: 1
 *                       user_city_id:
 *                            type: string
 *                            required: true
 *                            description: city id
 *                            example: 1
 *       responses:
 *         200:
 *           description: City updated successfully
 *         "401":
 *           $ref: '#/components/responses/UnauthorizedError'
 *
 *
 */
router.post("/updateUserCity", userValidator.updateUserCity, (req, res) => {
  userController
    .updateUserCity(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

router.post("/signUp", userValidator.signUp, (req, res) => {
  userController
    .signUp(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

router.post("/forgotPassword", userValidator.forgotPassword, (req, res) => {
  userController
    .forgotPassword(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

router.post("/resetPassword", userValidator.resetPassword, (req, res) => {
  userController
    .resetPassword(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/user/getAllUser/{limit}/{skip}:
 *    get:
 *       tags: [Users]
 *       description:
 *       summary: Get all users list
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
 *           description: users listed successfully
 *
 *
 */

router.get("/getAllUser/:limit/:skip", (req, res) => {
  userController
    .getAllUser(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/user/profile/{id}:
 *    get:
 *       tags: [Users]
 *       description:
 *       summary: Get profile info
 *       parameters:
 *         - name: id
 *           in: path
 *           type: string
 *           required: true
 *           example: 63b421d8215b568d4d7fbb0b
 *       responses:
 *         200:
 *           description: users listed successfully
 *
 *
 */

router.get("/profile/:id", (req, res) => {
  userController
    .profile(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

/**
 * @swagger
 * /api/user/deleteUser:
 *    delete:
 *       tags: [Users]
 *       description:
 *       summary: deactivate profile
 *       parameters:
 *         - name: userId
 *           in: query
 *           type: string
 *           required: true
 *           example: 63b421d8215b568d4d7fbb0b
 *       responses:
 *         200:
 *           description: users listed successfully
 *
 *
 */
router.delete("/deleteUser", (req, res) => {
  userController
    .deleteUser(req)
    .then((data) => {
      res.status(stringFile.SUCCESS_STATUS_CODE).send(data);
    })
    .catch((err) =>
      res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    );
});

module.exports = router;
