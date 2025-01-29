const body = require('express-validator').body;

const createProductValidator = [
    body('name', 'Name not supplied').not().isEmpty(),
    body('name', 'Invalid name length').isLength({min: 1, max: 50}),
    body('name').trim().escape(),
    body('description', 'Description not supplied').not().isEmpty(),
    body('description', 'Invalid description length').isLength({min: 1, max: 50}),
    body('description').trim().escape(),
    body('stock', 'Stock not supplied').not().isEmpty(),
    body('stock', 'Stock incorrect value - must be positive integer').isInt({min: 0}),
    body('price', 'Price not supplied').not().isEmpty(),
    body('price', 'Price incorrect value - must be positive float').isFloat({min: 0}),
]

const sellProductValidator = [
    body('amount').optional().isInt({min: 1}),
]

const restockProductValidator = [
    body('amount').optional().isInt({min: 1}),
]

module.exports = {
    createProductValidator,
    sellProductValidator,
    restockProductValidator,
}