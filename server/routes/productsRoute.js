const products = require('express').Router()

const Product = require('../models/Products')

const isAdmin = require('../middleware/isAdmin')

//create new Product
products.post('/create/product',isAdmin,  (req, res) => {
    Product.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            res.status(200).json({ data, msg: "Added Successfully" })
        }
    })
})

//Get all the Products 
products.get('/products', async (req, res) => {
    await Product.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            res.status(200).json(data);
        }
    })
})

//Get all the Products by category
products.get('/products/:id', async (req, res) => {
    await Product.find({ category: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            res.status(200).json(data);
        }
    })
})

//Get one Product
products.get('/one-product/:id', async (req, res) => {
    await Product.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            res.status(200).json(data);
        }
    })
})

//Delete Product
products.delete('/delete-product/:id',isAdmin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            res.status(200).json({ data, msg: "Deleted Successfully" });
        }
    })
})

//update Product $set
products.put('/update-product/:id',isAdmin, async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id,
        { $set: req.body }, (err, data) => {
            if (err) {
                res.status(500).send({ error: true, msg: err.message })
            } else {
                res.status(200).json({ data, msg: "Updated Successfully" });
            }
        }
    )
})

// search for products
products.get('/search-product/:id', async (req, res) => {
    await Product.find({ 'title': { $regex: req.params.id, $options: "i" } }, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err })
        } else {
            res.status(200).json({ data, msg: 'Found Matching Products' })
        }
    })
})



// give me the products with categories
products.get('/pop-products', async (req, res) => {
    Product.
        find()
        .populate('category')
        .then(data => {
            res.json(data)
            console.table(data)
        })
})


module.exports = products


