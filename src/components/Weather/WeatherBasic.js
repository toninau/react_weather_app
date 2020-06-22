import React from 'react'
import { localDateString } from '../../utils/date_functions'

const WeatherBasic = ({ weather }) => {
  const image = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
  const local = localDateString(weather.dt, weather.timezone, 'basic')

  return (
    <div className="weather-card-basic">
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
        <div>
          <p>local time {local}</p>
        </div>
      </div>
      <div className="weather-basic-desc">
        <img src={image} alt="icon" />
        <span>{weather.weather[0].main}</span>
        <span>{weather.weather[0].description}</span>
      </div>
    </div>
  )
}

export default WeatherBasic