import React from 'react'
import { localDateString } from '../../utils/date_functions'

const WeatherForecastSingle = ({ data }) => {
  const image = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  const local = localDateString(data.dt, 'forecast')

  return (
    <div className="weather-forecast-single">
      <p>{local}</p>
      <div className="weather-forecast-info">
        <span>{Math.round(data.main.temp)}°C</span>
        <img src={image} alt={`Icon ${data.weather[0].description}`} />
      </div>
      {data.rain ?
        <p>{data.rain['3h']} mm rain</p> :
        <p>no rain</p>
      }
    </div>
  )
}

const WeatherForecast = ({ forecast }) => {
  const forecastData = forecast.slice(0, 4)

  return (
    <div className="weather-card-forecast">
      {forecastData.map(data => (
        <WeatherForecastSingle key={data.dt} data={data} />
      ))}
    </div>
  )
}

export default WeatherForecast