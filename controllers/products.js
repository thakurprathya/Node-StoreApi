const Product = require('../models/product');

// Queries: for creating different queries refer mongoose docs-> queries
const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ price: { $gt: 30 } }).sort('price').select('name price');
    res.status(200).json({ resultsCount: products.length, products });
};
const getAllProducts = async (req, res) => {  //query based get request
    const { featured, company, name, sort, fields, numericFilters } = req.query;  //destructuring req parameters from request url after ? symbol
    const queryObject = {};

    //different queries
    if(featured){ queryObject.featured = featured === 'true' ? true : false; }
    if(company){ queryObject.company = company; }
    if(name){ queryObject.name = { $regex: name, $options: 'i' }; }  //using mongodb query operators, will look for every name with pattern = name string in it
    if(numericFilters){
        const operatorMap = { '>': '$gt', '>=': '$gte', '=': '$eq', '<': '$lt', '<=': '$lte' };  //using mongoose query operators
        const options = ['price', 'rating'];
        const regEx = /\b(>|>=|=|<|<=)\b/g;  //regular expression
        let filters = numericFilters.replace( regEx, (match) => `-${operatorMap[match]}-` );
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)){ queryObject[field] = { [operator]: Number(value) }; }
        });
    }

    let result = Product.find(queryObject);  //main search url after adding all queries, not using await here as there are more queries which needed to be handled depending upon there existance

    //extra queries which might or might not be provided
    if(sort){  //sorting the obtained results depending upon sort parameter
        const sortList = sort.split(',').join(' ');  //updating all the value of sort to be space seprated instead of , as sort query object sorts results based on those space seprated params
        result = result.sort(sortList);
    }
    else{ result = result.sort('createdAt'); }  //sorting by date in ascending, for desending add - before sort value
    if(fields){  //selecting certain fields from whole schema
        const fieldsList = fields.split(',').join(' ');  //updating all the fields value to be space seprated instead of ,
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;  //this query limits the no. of results
    const skip = (page - 1) * limit;  //this query is used to skip certain results

    result = result.skip(skip).limit(limit);  //splitting results in multiple pages like total results 23 -> 4pages => 7, 7, 7, 2

    const products = await result;  //now fetching data depending upon main query
    res.status(200).json({ resultsCount: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };