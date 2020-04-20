## REST API built in NodeJS with Express
 GitHub repository: https://github.com/petelina17/rest_api_lab 

### Start server
To start server write node server.js in terminal window

### Try REST API
To test API go to rest-api.rest file in your IDE and push 

### Description 
This is the the simple REST API in NodeJS with express library.  
API is built to work with information about products.

The API has functionality for CRUD, it includes 5 endpoints, using these HTTP-methods:
GET, DELETE, POST, PUT.  
 
Each endpoint performs what its calling method intends to perform:
 * POST /product - adds product
 * PUT /product - updates product info   
 * GET /product/:id - fetches one product
 * DELETE /product/:id - removes product
 * GET /products - fetches all products

I chose my API to handle product-data.json file from my project webshop, 
which contents the array of products with 7 properties for every object, one of which is id,
 instead to have all data stored locally in the server file, I hope it's ok.

### Product data example:
```json
  {
    "category": 5224,
    "id": "7313060005803",
    "image": "./img/7313060005803.jpg",
    "name": "Allroundgödsel Växa 7,5kg",
    "salePrice": 149.99,
    "description": "I en planteringslåda kan du på liten yta...",
    "measure": "st"
  }
```

