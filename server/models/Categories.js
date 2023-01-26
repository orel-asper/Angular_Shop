// all the rellevant ccategories
const mongoose = require("mongoose");

const { Schema } = mongoose

const Categories = new Schema({
    category: {
        type: String, required: true, unique: true,
    }
})

module.exports = mongoose.model("Categories", Categories);

