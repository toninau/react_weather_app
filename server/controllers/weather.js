const weatherRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

let cachedWeathers = []

weatherRouter.get('/:city', async (request, response, next) => {
  const city = request.params.city.toLowerCase()
  const cachedWeather = cachedWeathers.find(c => c.cachedData.name.toLowerCase() === city)

  //respond with in memory cache if data less than 5min old
  if (cachedWeather) {
    const timeCheck = Date.now() - 300 * 1000
    if (cachedWeather.cacheTime > timeCheck) {
      return response.json(cachedWeather.cachedData)
    } else {
      //remove all old data
      cachedWeathers = cachedWeathers.filter(c => c.cacheTime > timeCheck)
    }
  }

  try {
    const params = new URLSearchParams({
      q: city,
      appid: config.API_KEY,
      units: 'metric'
    })
    const { data } = await axios.get(`${BASE_URL}${params}`)
    //maximum limit of 5 exceeded, remove oldest
    if (cachedWeathers.length > 4) {
      cachedWeathers.shift()
    }
    cachedWeathers.push({ cachedData: data, cacheTime: Date.now() })
    return response.json(data)
  } catch (error) {
    return next(error)
  }
})

module.exports = weatherRouter