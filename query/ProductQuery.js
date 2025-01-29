const productModel = require('../common/model/ProductModel');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let products = await productModel.find({});
    res.send(products);
});

module.exports = router;

