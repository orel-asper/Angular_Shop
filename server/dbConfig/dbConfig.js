const dbConfig = require('express').Router()
const mongoose = require('mongoose')

const mongoUri = `mongodb://localhost/shop`

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb instance')
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongodb instance:', err)
})

module.exports = dbConfig;