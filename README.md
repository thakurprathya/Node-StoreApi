# Node-StoreApi

A simple Node app to understand query based searching in API with 2 endpoints created using Node, Express, MongoDB
* Get All Items ==> https://node-storeapi.onrender.com/api/v1/products/static
* Get All Items with search query implementation ==>  https://node-storeapi.onrender.com/api/v1/products
    -> for adding any search query use "?property=parameter" after main domain
    -> for adding multiple queries at once use "&" to join queries
    -> available queries -:
        ; page : by default will show only 10 results on a page set page=2, for remaining results
        ; company : will show results for provided companies only, multiple fields can be passed "," seprated
        ; name  : will show results for provided names only, multiple fields can be passed "," seprated
        ; sort  : providing negative parameter will sort in descending order
        ; featured : will show only provided fields in results, multiple fields can be passed "," seprated
        ; numericFilters : price and rating for results can be filterd using this query just provide property to change with operator and value for example- "numericFilters=price>30"

for running on local environment after copying the repo use command "npm install && start"

App link : https://node-storeapi.onrender.com