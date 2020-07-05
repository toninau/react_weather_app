import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setWeather } from '../../reducers/weatherReducer'

import WeatherBasic from './WeatherBasic'
import WeatherDetails from './WeatherDetails'
import WeatherChart from './WeatherChart'
import WeatherForecast from './WeatherForecast'

const Weather = () => {
  const { params: { city } } = useRouteMatch('/weather/:city')

  const dispatch = useDispatch()
  const weather = useSelector(state => state.weather)

  useEffect(() => {
    dispatch(setWeather(city))
  }, [dispatch, city])

  if (weather) {
    if (weather.error) {
      return <p>{city} not found</p>
    } else {
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
  }
  return <p>loading...</p>
}

export default Weather