const express = require('express')
const fs = require('fs')


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json('HELLO')
})

// read/get the product by id
app.get('/product/:id', (req, res) => {
  const id = req.params.id

// read product file and find exact id
  fs.readFile('product-data.json', 'utf8', function (err, data) {
    const products = JSON.parse(data)
    const found = products.find(x => x.id === id)
    if (found) {
      // server fills respons params
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      const productJson = JSON.stringify(found)
      res.end(productJson)
    }
    else {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain')
      res.end('sorry, product does not exist ' + id)
    }
  })

})

// delete product
app.delete('/product/:id', (req, res) => {
  const id = req.params.id

  // read file first
  fs.readFile('product-data.json', 'utf8', function (err, data) {
    // convert content to array
    let products = JSON.parse(data)

    // remove elem with id
    products = products.filter(x => x.id !== id)

    // write back filtered array to file
    fs.writeFile('product-data.json', JSON.stringify(products), 'utf8', (err) => {

      // check if write-operation error
      if (err) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/plain')
        res.end('sorry, could not delete product: ' + id + ', error:' + err)
      } else {

        // write was OK, create OK responce
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('OK')
      }
    })
  })
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

