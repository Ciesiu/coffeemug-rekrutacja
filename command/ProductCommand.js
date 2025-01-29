const {createProductValidator, restockProductValidator, sellProductValidator} = require('../common/validator/ProductValidator')
const productModel = require('../common/model/ProductModel');
const express = require('express');
const router = express.Router();
const validationResult = require('express-validator').validationResult;

router.post('/', createProductValidator, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    let product = new productModel();
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.save()
        .then((product) => {
            res.status(200).send({message: 'Product saved successfully'});
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send({message: err.message});
        });
});

router.post('/:id/restock', restockProductValidator, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    let productId = req.params.id;
    let amount = req.body.amount;
    if(amount === undefined) amount = 1;
    let tmp = await productModel.findById(productId);
    if(!tmp) {
        res.status(400).send({message: 'No product found matching ID'});
        return;
    }
    tmp.stock += +amount;
    await tmp.save()
        .then((product) => {
            res.status(200).send({message: 'Product saved successfully'});
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send({message: err.message});
        });
})

router.post('/:id/sell', sellProductValidator, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    let productId = req.params.id;
    let amount = req.body.amount;
    if(amount === undefined) amount = 1;
    let tmp = await productModel.findById(productId);
    if(!tmp) {
        res.status(400).send({message: 'No product found matching ID'});
        return;
    }
    if(tmp.stock - amount < 0) {
        res.status(400).send({message: 'Not enough of selected product in stock'})
        return;
    }
    tmp.stock -= +amount;
    await tmp.save()
        .then((product) => {
            res.status(200).send({message: 'Product saved successfully'});
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send({message: err.message});
        });
})

module.exports = router;

