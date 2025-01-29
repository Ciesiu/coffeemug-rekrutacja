const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderProductSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
})

let orderSchema = new Schema({
    customerId: {
        type: String,
        required: true,
    },
    products: {
        type: [orderProductSchema],
        minItems: 1,
        required: true,
    },
})

module.exports = mongoose.model('OrderModel', orderSchema);
