const forecastRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?'

let cachedForecasts = []

forecastRouter.get('/:city', async (request, response, next) => {
  const city = request.params.city.toLowerCase()
  const cachedWeather = cachedForecasts.find(c => c.cachedData.city.name.toLowerCase() === city)

  //respond with in memory cache if data less than 15min old
  if (cachedWeather) {
    const timeCheck = Date.now() - 900 * 1000
    if (cachedWeather.cacheTime > timeCheck) {
      return response.json(cachedWeather.cachedData)
    } else {
      //remove all old data
      cachedForecasts = cachedForecasts.filter(c => c.cacheTime > timeCheck)
    }
  }

  try {
    const params = new URLSearchParams({
      q: city,
      appid: config.API_KEY,
      units: 'metric'
    })
    const { data } = await axios.get(`${BASE_URL}${params}`)
    //maximum limit of 3 exceeded, remove oldest
    if (cachedForecasts.length > 2) {
      cachedForecasts.shift()
    }
    cachedForecasts.push({ cachedData: data, cacheTime: Date.now() })
    return response.json(data)
  } catch (error) {
    return next(error)
  }
})

module.exports = forecastRouter