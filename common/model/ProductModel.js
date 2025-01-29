const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {
        type: String,
        maxLength: 60,
        required: true,
    },
    description: {
        type: String,
        maxLength: 60,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    stock: {
        type: Number,
        min: 0,
        required: true,
    },
})

module.exports = mongoose.model('ProductModel', productSchema);
