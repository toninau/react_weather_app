import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'

import WeatherBasic from './WeatherBasic'
import WeatherDetails from './WeatherDetails'
import WeatherChart from './WeatherChart'
import WeatherForecast from './WeatherForecast'

const Weather = () => {
  const { params: { city } } = useRouteMatch('/weather/:city')
  const [weatherBasic, setWeatherBasic] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY
  const urlBasic = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

  const timeConverter = (weatherBasic, weatherForecast) => {
    const timezone = weatherBasic.timezone
    const basic = {
      ...weatherBasic,
      dt: weatherBasic.dt + timezone,
      sys: {
        sunrise: weatherBasic.sys.sunrise + timezone,
        sunset: weatherBasic.sys.sunset + timezone
      }
    }
    setWeatherBasic(basic)
    const forecast = weatherForecast.list.map(weather => {
      const weather3h = { ...weather, dt: weather.dt + timezone }
      return weather3h
    })
    setWeatherForecast(forecast)
  }

  useEffect(() => {
    setLoading(true)
    axios
      .all([axios.get(urlBasic), axios.get(urlForecast)])
      .then(axios.spread((...responses) => {
        timeConverter(responses[0].data, responses[1].data)
      }))
      .catch(() => {
        setWeatherBasic(null)
        setWeatherForecast(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [urlBasic, urlForecast])

  if (loading) return <p>loading...</p>
  if (weatherBasic) {
    return (
      <div className="weather-container">
        <WeatherBasic weather={weatherBasic} />
        <WeatherForecast forecast={weatherForecast} />
        <WeatherDetails weather={weatherBasic} />
        <WeatherChart weatherData={weatherForecast} />
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