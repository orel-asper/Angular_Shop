const orders = require('express').Router()

const Order = require('../models/Orders')


// create new Order
orders.post('/create-order', (req, res) => {
    Order.create(req.body, (err, order) => {
        if (err) return res.status(500).send({ error: true, message: err })
        res.status(200).json({ order, msg: 'Order created successfully' })
    })
})

// get all orders
orders.get('/get-orders', (req, res) => {
    Order.find({}, (err, order) => {
        if (err) return res.status(500).send({ error: true, message: err })
        res.status(200).json({ order, msg: 'yay you got all the orders' })
    })
})

//Get one order
orders.get('/get-user-orders/:id', async (req, res) => {
    await Order.find({ userId: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ error: true, msg: err.message })
        } else {
            res.status(200).json(data);
        }
    })
})



module.exports = orders
