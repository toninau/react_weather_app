import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { localDateString, dayLightPercentage } from '../../utils/date_functions'
import { useMountEffect } from '../../hooks'

const WeatherDetails = ({ weather }) => {
  const barRef = useRef(null)
  const sunrise = localDateString(weather.sys.sunrise, 'details')
  const sunset = localDateString(weather.sys.sunset, 'details')
  const current = localDateString(new Date().getTime() / 1000 + weather.timezone, 'details')

  const data = {
    humidity: `${weather.main.humidity} %`,
    rain: `${weather.rain ? weather.rain['1h'] : 0} mm`,
    pressure: `${weather.main.pressure} hPa`,
    visibility: `${weather.visibility} m`,
    'high/low': `${Math.round(weather.main.temp_max)}/${Math.round(weather.main.temp_min)} °C`,
    'wind speed': `${weather.wind.speed} m/s`,
    'wind direction': `${weather.wind.deg} deg`
  }

  useMountEffect(() => {
    const current = new Date().getTime() + weather.timezone * 1000
    const sunrise = weather.sys.sunrise * 1000
    const sunset = weather.sys.sunset * 1000
    const p = dayLightPercentage(current, sunrise, sunset)
    barRef.current.style.transform = `rotate(${45 + (p * 1.8)}deg)`
  })

  return (
    <div id="details" className="weather-card-details weather-card">
      <div className="weather-details-main">
        <div className="weather-details-feels">
          <span>feels like</span>
          <span id="feels_like">{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className="weather-details-daylight">
          <div className="progress">
            <div className="barOverflow">
              <div ref={barRef} className="bar"></div>
            </div>
            <span>{current}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <i className="material-icons">brightness_1</i>
              <p>{sunrise} </p>
            </div>
            <div style={{ display: 'flex' }}>
              <i className="material-icons">nights_stay</i>
              <p>{sunset} </p>
            </div>
          </div>
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