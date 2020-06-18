import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'

import WeatherBasic from './WeatherBasic'
import WeatherDetails from './WeatherDetails'

const Weather = () => {
  const { params: { city } } = useRouteMatch('/weather/:city')
  const [weatherBasic, setWeatherBasic] = useState(null)
  const [weatherDetails, setWeatherDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY
  const urlBasic = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  const urlDetails = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

  useEffect(() => {
    setLoading(true)
    axios
      .all([axios.get(urlBasic), axios.get(urlDetails)])
      .then(axios.spread((...responses) => {
        setWeatherBasic(responses[0].data)
        setWeatherDetails(responses[1].data)
        setLoading(false)
      }))
      .catch(() => {
        setWeatherBasic(null)
        setWeatherDetails(null)
        setLoading(false)
      })
  }, [urlBasic, urlDetails])

  if (loading) return <p>loading...</p>
  if (weatherBasic) {
    return (
      <div>
        <WeatherBasic weather={weatherBasic} />
        <WeatherDetails weather={weatherDetails} />
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