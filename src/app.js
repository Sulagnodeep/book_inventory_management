const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const storeRouter = require('./routers/store')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(storeRouter)

app.listen(3000, () => {
    console.log('Server Started.')
})