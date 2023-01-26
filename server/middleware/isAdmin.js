require("dotenv").config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).send({ error: true, msg: 'You must be logged in.' })
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.MY_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(401).send({ error: true, msg: 'You must be logged in.' })
        if (payload.admin === true) {
            next()
        }
    })
}