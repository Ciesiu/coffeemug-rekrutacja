const orderModel = require('../common/model/OrderModel');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let products = await orderModel.find({});
    res.send(products);
});

module.exports = router;