import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'

const Weather = () => {
  const { params: { city } } = useRouteMatch('/location/:city')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

  useEffect(() => {
    setLoading(true)
    axios
      .get(url)
      .then(response => {
        setLoading(false)
        setWeather(response.data)
      })
      .catch(() => {
        setLoading(false)
        setWeather(null)
      })
  }, [url])

  if (loading) return 'loading...'
  if (weather) {
    return (
      <div>
        <h3>Weather in {weather.name}</h3>
        <p>temperature: {weather.main.temp} Celcius</p>
      </div>
    )
  }
  return (
    <div>
      <p>{city} not found</p>
    </div>
  )
}

export default Weather