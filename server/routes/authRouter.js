require("dotenv").config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const router = express.Router()


//signup
router.post('/signup', async (req, res) => {
    const { email, password, username, firstName, lastName, ID, city, street, role } = req.body
    const isUser = await User.findOne({ email })
    if (isUser) return res.status(422).send({ error: 'User already exists' })
    try {
        const user = new User({ email, password, username, firstName, lastName, ID, city, street, role })
        await user.save()

        const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET_KEY)
        res.send({ token, msg: 'User added successfully' })
    } catch (err) {
        return res.status(422).send(err.message)
    }
})

// signin
router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(422).send({ error: 'Invalid email or password' })
    const user = await User.findOne({ email })
    if (!user) return res.status(422).send({ error: 'Invalid password or email' })
    try {
        await user.comparePassword(password)
        const token = jwt.sign({ userId: user._id, userName: user.username, admin: user.admin, city: user.city, street: user.street }, process.env.MY_SECRET_KEY)
        res.send({ token })
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' })
    }
})

module.exports = router
