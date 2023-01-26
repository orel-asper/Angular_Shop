const shoppingCart = require('../models/ShoppingCart')

module.exports = async (req, res, next) => {
    let Cart = {
        _id: req.user._id,
        active: true
    }
    await shoppingCart.findById(req.user._id, (err, cart) => {
        if (req.user.admin) return 
        if (err) return res.status(500).json({ error: true, message: 'error getting Cart' })
        if (cart === null) {
            shoppingCart.create(Cart, (err, cart) => {
                if (err) return res.status(500).json({ error: true, message: 'error creating' })
                res.json(cart)
                next()
            })
        } else {
            res.json(cart)
            next()
        }
    })
}

