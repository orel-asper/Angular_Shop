const shoppingCart = require('express').Router()
const Cart = require('../models/ShoppingCart')


// add item to cart
shoppingCart.post('/add-item/cart/:id', (req, res) => {
    const { product } = req.body
    Cart.findOneAndUpdate({ _id: req.params.id, 'shoppingItems.product': { $ne: product } }, { $addToSet: { shoppingItems: req.body } }, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            if (data === null) return res.status(200).json({ error: true, msg: 'this product has been already added' })
            res.status(200).json({ data: data, msg: "added successfully" })
        }
    })
})


//Get all the shoppingCart
shoppingCart.get('/shopping-cart/:id', async (req, res) => {
    await Cart.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            res.status(200).json(data);
        }
    })
})


//Get one Cart
shoppingCart.get('/cart/:id', async (req, res) => {
    try {
        await Cart.findById({ _id: req.params.id })
            .populate({
                path: 'shoppingItems',
                populate: {
                    path: 'product',
                    model: 'Products'
                }
            })
            .then(data => res.status(200).json(data))
    } catch (err) {
        res.status(500).send({ error: true, msg: err.message })
    }
})


//Delete items from  Cart
shoppingCart.delete('/delete-cart-item/:cartid/:id', async (req, res) => {
    await Cart.updateOne(
        { _id: req.params.cartid },
        { $pull: { 'shoppingItems': { _id: req.params.id } } },
        (err, data) => {
            if (err) {
                res.status(500).send({ error: true, msg: err.message })
            } else {
                res.status(200).json({ data: data, msg: "Deleted Successfully" })
            }
        })
})


//Delete all items from  Cart
shoppingCart.delete('/delete-cart/:cartid', async (req, res) => {
    await Cart.updateOne(
        { _id: req.params.cartid },
        { $pull: { 'shoppingItems': {} } },
        (err, data) => {
            if (err) {
                res.status(500).send({ error: true, msg: err.message })
            } else {
                res.status(200).json({ data: data, msg: "All Items Deleted From Cart" })
            }
        })
})


module.exports = shoppingCart

