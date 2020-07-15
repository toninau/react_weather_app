const express = require('express')
const app = express()
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const weatherRouter = require('./controllers/weather')
const forecastRouter = require('./controllers/forecast')
const middleware = require('./utils/middleware')

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 6
})

app.set('trust proxy', 1)
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/', apiLimiter)

app.use('/api/weather', weatherRouter)
app.use('/api/forecast', forecastRouter)
app.use(express.static('client/build'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app