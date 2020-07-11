import React from 'react'
import PropTypes from 'prop-types'

import { localDateString } from '../../utils/date_functions'

const WeatherDetails = ({ weather }) => {
  const sunrise = localDateString(weather.sys.sunrise, 'details')
  const sunset = localDateString(weather.sys.sunset, 'details')

  const data = {
    humidity: `${weather.main.humidity} %`,
    rain: `${weather.rain ? weather.rain['1h'] : 0} mm`,
    pressure: `${weather.main.pressure} hPa`,
    visibility: `${weather.visibility} m`,
    'high/low': `${Math.round(weather.main.temp_max)}/${Math.round(weather.main.temp_min)} (°C)`
  }

  return (
    <div id="details" className="weather-card-details">
      <div className="weather-details-main">
        <div className="weather-details-feels">
          <span id="feels_like">{Math.round(weather.main.feels_like)}°C</span>
          <span>feels like</span>
        </div>
        <div>
          <ul>
            <li>sunrise: {sunrise}</li>
            <li>sunset: {sunset}</li>
          </ul>
        </div>
      </div>
      <div className="weather-details-info">
        <div className="weather-details-table">
          {Object.keys(data).map(key => (
            <div className="weather-details-data" key={key}>
              <span>{key}</span>
              <span>{data[key]}</span>
            </div>
          ))}
        </div>
        <div className="weather-details-wind">
          <p>wind: {weather.wind.speed} {weather.wind.deg}</p>
        </div>
      </div>
    </div>
  )
}

WeatherDetails.propTypes = {
  weather: PropTypes.shape({
    main: PropTypes.objectOf(PropTypes.number).isRequired,
    visibility: PropTypes.number.isRequired,
    wind: PropTypes.objectOf(PropTypes.number).isRequired,
    sys: PropTypes.shape({
      sunrise: PropTypes.number.isRequired,
      sunset: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
}

export default WeatherDetails