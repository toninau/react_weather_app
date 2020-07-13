const express = require('express')
const app = express()
const cors = require('cors')
const weatherRouter = require('./controllers/weather')
const forecastRouter = require('./controllers/forecast')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/weather', weatherRouter)
app.use('/api/forecast', forecastRouter)
app.use(express.static('client/build'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app