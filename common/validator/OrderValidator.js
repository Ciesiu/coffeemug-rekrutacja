const body = require('express-validator').body;

const createOrderValidator = [
    body('customerId', 'Customer ID not supplied').not().isEmpty(),
    body('customerId').trim().escape(),
    body('products', 'Products cannot be empty').isArray({min: 1}),
    body('products.*.productId').trim().escape(),
    body('products.*.productId').isLength({min: 24, max: 24}),
    body('products.*.productId', 'One of supplied product IDs is empty').not().isEmpty(),
    body('products.*.amount', 'One of supplied products amount is invalid').isInt({min: 0}),
]

module.exports = {
    createOrderValidator,
}