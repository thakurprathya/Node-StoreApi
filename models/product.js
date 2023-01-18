const mongoose = require('mongoose');

//schemas our userdefined structures for database collection as mongoDB noSQL db it doesn't have any predefined structure
//models are fancy structures compiled from schema definations, instance of model is called a document, they are responsible for creating and reading documents from database.
//we have provided validation to our schema, for further validation props refer mongoose docs-> validation.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {  // this property will be used to limit the options for this parameter
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'   //this is a custom message which will be displayed if value didn't match our options
        }
    }
});

module.exports = mongoose.model('Product', productSchema);