const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  // returning a promise
  // the second parameter passed in connect function is because we're using version 5 of mongoose, so we added it to remove the deprecation warnings 

}

module.exports = connectDB;
