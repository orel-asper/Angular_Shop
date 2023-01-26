const mongoose = require('mongoose')

//  category  , id , image , price ,title
const { Schema } = mongoose

const Products = new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    title: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    description: {
        type: String, required: true
    },
    imagePath: {
        type: String, required: true
    },
})


module.exports = mongoose.model("Products", Products);