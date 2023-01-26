require('./models/User')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./dbConfig/dbConfig')
const authRouter = require('./routes/authRouter')
const createCart = require('./middleware/createCart')
const requireAuth = require('./middleware/requireAuth')
const productRouter = require('./routes/productsRoute')
const orderRouter = require('./routes/ordersRouter')
const categoriesRouter = require('./routes/categoriesRouter')
const shoppingCartRouter = require('./routes/shoppingCartRoutes')
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(authRouter, productRouter, categoriesRouter, shoppingCartRouter, orderRouter)

//mongodb config
app.use(dbConfig)

// create cart and verify Authorization
app.use('/', requireAuth, createCart)


const PORT = process.env.PORT || 3005

app.listen(PORT, () => console.log(`server is up and running at http://localhost:${PORT}`))