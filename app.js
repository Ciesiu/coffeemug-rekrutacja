const express = require('express');
const app = express ();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productQuery = require('./query/ProductQuery')
const productCommand = require('./command/ProductCommand')
const orderQuery = require('./query/OrderQuery');
const orderCommand = require('./command/OrderCommand');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoDB = 'mongodb+srv://admin:admin@cluster0.olwah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server open on port:', PORT);
});


app.use('/products',productQuery);
app.use('/products',productCommand);
app.use('/orders',orderQuery);
app.use('/orders',orderCommand);


main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}