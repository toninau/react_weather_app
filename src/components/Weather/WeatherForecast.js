import React from 'react'
import { localDateString } from '../../utils/date_functions'

const WeatherForecastSingle = ({ data, timezone }) => {
  const image = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  const local = localDateString(data.dt, timezone)

  return (
    <div className="weather-forecast-single">
      <p>{local}</p>
      <span>{Math.round(data.main.temp)}°C</span>
      <img src={image} alt="icon" />
    </div>
  )
}

const WeatherForecast = ({ forecast, timezone }) => {
  const forecastData = forecast.slice(0, 4)

  return (
    <div className="weather-card-forecast">
      {forecastData.map(data => (
        <WeatherForecastSingle key={data.dt} data={data} timezone={timezone} />
      ))}
    </div>
  )
}

export default WeatherForecast