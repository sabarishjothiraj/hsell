const {
    check,
    validationResult,
    query
} = require('express-validator')
const stringFile = require('../common/string_file.json')
const UserModel = require('../model/category')
const {
    ObjectId
} = require('mongoose').Types


exports.createProduct = [
    check('cat_name').not().isEmpty().withMessage(stringFile.PRODUCT_NAME_MUST_NOT_EMPTY),
    check('cat_parent_id').not().isEmpty().withMessage(stringFile.CATEGORY_PARENT_ID_MUST_NOT_EMPTY),
    (req, res, next) => {
        const errorValidation = validationResult(req)
        if (!errorValidation.isEmpty()) {
            return res.status(422).send({
                message: errorValidation.errors.shift().msg
            })
        }
        next()
    }
]