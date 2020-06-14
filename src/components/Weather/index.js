import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'

import WeatherBasic from './WeatherBasic'
import WeatherDetails from './WeatherDetails'

const Weather = () => {
  const { params: { city } } = useRouteMatch('/weather/:city')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

  useEffect(() => {
    setLoading(true)
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
        setLoading(false)
      })
      .catch(() => {
        setWeather(null)
        setLoading(false)
      })
  }, [url])

  if (loading) return 'loading...'
  if (weather) {
    return (
      <div>
        <WeatherBasic weather={weather} />
        {!show ?
          <button onClick={() => setShow(!show)}>show more</button> :
          <WeatherDetails coord={weather.coord} />
        }
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