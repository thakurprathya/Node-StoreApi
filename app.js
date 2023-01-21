require('dotenv').config();
//async errors package will make error handling much easier, no need to create asyncWrapper to handle error or use try catch block for routes (here instead of using next function we can throw error, which will be handled by it)-> read its docs for better understanding
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./database/connect');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());  //if we donot use it we won't have data in req.body

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Query Based Products Route</a><br><a href="/api/v1/products/static">All Products Route</a>');
});
app.use('/api/v1/products', productsRouter);  // products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//setting up port for server
const port = process.env.PORT || 3000;

//connecting to DataBase
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  }catch(error){
    console.log(error);
  }
};
start();