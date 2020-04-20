const express = require('express')
const fs = require('fs')
var path = require('path');

const app = express()

// Parse request body as json
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
    } else {
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
  // read new product-data from request-body
 const newProduct = req.body

  // read file first
  fs.readFile('product-data.json', 'utf8', function (err, data) {
    // convert content to array
    let products = JSON.parse(data)

    //find pruduct with the same id in the file
    const found = products.find(x => x.id === newProduct.id)

    // check if elem already exists
    if (found) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain')
      res.end('sorry, product already exist ' + newProduct.id)
      return
    }

    // add new elem
    products.push(newProduct)

    // write back updated array to file
    fs.writeFile('product-data.json', JSON.stringify(products), 'utf8', (err) => {

      // check if write-operation error
      if (err) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/plain')
        res.end('sorry, could not add product: ' + newProduct.id + ', error:' + err)
      } else {

        // write was OK, create OK responce
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('ADDED')
      }
    })
  })


})

// edit/update product
app.put('/product', (req, res) => {
  // read modified product-data from request-body
  const modifiedProduct = req.body

  // read file first
  fs.readFile('product-data.json', 'utf8', function (err, data) {
    // convert content to array
    let products = JSON.parse(data)

    // check if product already exists
    //find pruduct with the same id in the file
    const found = products.find(x => x.id === modifiedProduct.id)

    // check if elem already exists
    if (!found) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain')
      res.end('sorry, product does not exist ' + modifiedProduct.id)
      return
    }


    // delete old product by id
    products = products.filter(x => x.id !== modifiedProduct.id)

    // add new elem
    products.push(modifiedProduct)

    // write back updated array to file
    fs.writeFile('product-data.json', JSON.stringify(products), 'utf8', (err) => {

      // check if write-operation error
      if (err) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/plain')
        res.end('sorry, could not update product: ' + modifiedProduct.id + ', error:' + err)
      } else {

        // write was OK, create OK responce
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('UPDATED')
      }
    })
  })
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

