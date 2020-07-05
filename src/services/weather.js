import axios from 'axios'

const baseUrl = 'http://api.openweathermap.org/data/2.5'

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY

const getWeather = async (city) => {
  const response = await axios.get(`${baseUrl}/weather?q=${city}&appid=${API_KEY}&units=metric`)
  return response.data
}

const getForecast = async (city) => {
  const response = await axios.get(`${baseUrl}/forecast?q=${city}&appid=${API_KEY}&units=metric`)
  return response.data
}

export default {
  getWeather,
  getForecast
}