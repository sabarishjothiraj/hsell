const {
    check,
    validationResult,
    query
} = require('express-validator')
const stringFile = require('../common/string_file.json')


exports.createShop = [
    check('shop_name').not().isEmpty().withMessage(stringFile.SHOP_NAME_MUST_NOT_EMPTY),
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