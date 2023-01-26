const categories = require('express').Router()
const Category = require('../models/Categories')

// get all categories
categories.get('/categories', async (req, res) => {
    await Category.find({}, (err, category) => {
        if (err) {
            res.status(500).json({ error: true, message: 'Error getting categories' + err })
        } else {
            res.status(200).json(category)
        }
    })
})


// ____________________________________________________
// Add categories function
const insertCategories = () => {
    Category.find({}, async (err, category) => {
        if (!category.length) {
            Category.deleteMany({}, (err) => {
                console.log('collection Category removed')
            })
            await Category.insertMany([
                {
                    category: 'Milk & Eggs',
                },
                {
                    category: 'Vegetables & Fruits',
                },
                {
                    category: 'Meat & Fish',
                },
                {
                    category: 'Wine & Drinks',
                },
            ])
        }
    })
}
insertCategories()
// ____________________________________________________

module.exports = categories