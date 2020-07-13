import React from 'react'
import PropTypes from 'prop-types'

import { localDateString } from '../../utils/date_functions'

const WeatherBasic = ({ weather }) => {
  const image = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
  const local = localDateString(weather.dt, 'basic')

  return (
    <div id="basic" className="weather-card-basic">
      <div className="weather-basic-info">
        <h2>Weather in {weather.name}</h2>
        <div className="weather-basic-temp">
          <span id="temp">{Math.round(weather.main.temp)}</span>
          <div className="weather-basic-minmax">
            <span>{Math.round(weather.main.temp_max)}</span>
            <span>{Math.round(weather.main.temp_min)}</span>
          </div>
          <span id="unit">°C</span>
        </div>
        <div className="weather-basic-date">
          <span>As of {local}</span>
          <span>local time</span>
        </div>
      </div>
      <div className="weather-basic-desc">
        <span>{weather.weather[0].main}</span>
        <img src={image} alt={`Icon ${weather.weather[0].description}`} />
        <span>{weather.weather[0].description}</span>
      </div>
    </div>
  )
}

WeatherBasic.propTypes = {
  weather: PropTypes.shape({
    weather: PropTypes.array.isRequired,
    main: PropTypes.objectOf(PropTypes.number).isRequired,
    dt: PropTypes.number.isRequired,
    timezone: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default WeatherBasic