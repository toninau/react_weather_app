import axios from 'axios'

const getWeather = async (city) => {
  const response = await axios.get(`/api/weather/${city}`)
  return response.data
}

const getForecast = async (city) => {
  const response = await axios.get(`/api/forecast/${city}`)
  return response.data
}

export default {
  getWeather,
  getForecast
}