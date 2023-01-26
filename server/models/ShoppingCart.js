const mongoose = require('mongoose')
// user id  , items { items [ALL]} , quantety
const { Schema } = mongoose

const ShoppingItems = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Products'
    },
    quantity: {
        type: Number, min: 1, required: true
    },
    totalPrice: {
        type: Number, required: true,
    },
}, { autoIndex: false })

const shoppingCart = new Schema({
    _id: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    date: {
        type: Date, default: new Date()
    },
    active: {
        type: Boolean, default: false
    },
    shoppingItems: [ShoppingItems]
})
 

module.exports = mongoose.model('Carts', shoppingCart)

