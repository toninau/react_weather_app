import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import WeatherBasic from './WeatherBasic'
import WeatherDetails from './WeatherDetails'
import WeatherChart from './WeatherChart'
import WeatherForecast from './WeatherForecast'
import WeatherSkeleton from './WeatherSkeleton'

import './weather.css'

const Weather = ({ fetchWeather }) => {
  const { params: { city } } = useRouteMatch('/weather/:city')
  const weather = useSelector(state => state.weather)

  useEffect(() => {
    fetchWeather(city)
  }, [city, fetchWeather])

  if (weather) {
    return (
      <div className="weather">
        <div className="weather-links">
          <a href="#basic">basic</a>
          <a href="#forecast">forecast</a>
          <a href="#details">details</a>
          <a href="#chart">chart</a>
        </div>
        <div className="weather-container">
          <WeatherBasic weather={weather.basic} />
          <WeatherForecast forecast={weather.forecast} />
          <WeatherDetails weather={weather.basic} />
          <WeatherChart weatherData={weather.forecast} />
        </div>
      </div>
    )
  }
  return <WeatherSkeleton />
}

Weather.propTypes = {
  fetchWeather: PropTypes.func.isRequired
}

export default Weather