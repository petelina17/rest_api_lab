const express = require('express')
const fs = require('fs')


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json('HELLO')
})

// read/get the product
app.get('/product', (req, res) => {

})

// delete product
app.del('/product', (req, res) => {

})

//create/add new product
app.post('/product', (req, res) => {

})

// edit/update product
app.put('/product', (req, res) => {

})

// read/get all products from product-data.json
app.get('/products', (req, res) => {
  fs.readFile('product-data.json', 'utf8', function (err, data) {
    // server fills respons params
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(data)
  })
})


app.listen(3000, () => console.log('Server is running'))

