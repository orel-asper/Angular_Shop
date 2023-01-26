// timestamp , items { product [ALL] , quantity } , shipping {address , city , name , userId , visa card}
const mongoose = require('mongoose')
const { Schema } = mongoose


const order = new Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        ref: "User"
    },
    finalPrice: {
        type: Number, require: true
    },
    address: {
        type: String, require: true
    },
    city: {
        type: String, require: true
    },
    date: {
        type: Date, require: true
    },
    visa: {
        type: String, require: true
    },
    shippingItems: { type: Array, require: true },
}, { timestamps: true })

module.exports = mongoose.model('Order', order)