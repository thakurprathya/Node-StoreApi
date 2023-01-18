//this file will help in populating our product.json to our database
require('dotenv').config();
const connectDB = require('./database/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);  //setting up a different connection from app.js
        await Product.deleteMany();  //removing all the products from db (mongoose model/query parameter)
        await Product.create(jsonProducts);
        console.log('Success!!!!');
        process.exit(0);  //exiting the process with no errors as data populated
    }catch(error){
        console.log(error);
        process.exit(1);  //exiting the process with error
    }
}
start();

//to populate need to run this file seprately run command -> node populate