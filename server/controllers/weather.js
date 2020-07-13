const weatherRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

weatherRouter.get('/:city', async (request, response, next) => {
  try {
    const params = new URLSearchParams({
      q: request.params.city,
      appid: config.API_KEY,
      units: 'metric'
    })
    const { data } = await axios.get(`${BASE_URL}${params}`)
    response.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = weatherRouter