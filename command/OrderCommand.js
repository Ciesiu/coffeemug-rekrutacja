const {createOrderValidator} = require('../common/validator/OrderValidator')
const orderModel = require('../common/model/OrderModel');
const productModel = require('../common/model/ProductModel');
const express = require('express');
const router = express.Router();
const validationResult = require('express-validator').validationResult;

router.post('/', createOrderValidator, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    let order = new orderModel();
    order.customerId = req.body.customerId;
    order.products = req.body.products;

    let affectedProducts = [];
    // check all products - do they exist? Is there enough of each?
    for(let orderProduct of req.body.products) {
        let productRecord = await productModel.findById(orderProduct.productId);
        if(!productRecord) {
            res.status(400).send({message: "Some of the supplied products do not exist"})
            return;
        }
        let stock = productRecord.stock;
        if(orderProduct.amount > stock) {
            res.status(400).send({message: "Some of the supplied products are not available in selected quantity"})
            return;
        }
        affectedProducts.push({product: productRecord, newStock: stock - orderProduct.amount});
    }
    // update all affected products
    for (let affectedProduct of affectedProducts) {
        affectedProduct.product.stock = affectedProduct.newStock;
        await affectedProduct.product.save()
            .then((product) => {
                // ok
            })
            .catch((err) => {
                console.error(err);
            });
    }

    order.save()
        .then((order) => {
            res.status(200).send({message: 'Order saved successfully'});
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send({message: err.message});
        });
})

module.exports = router;