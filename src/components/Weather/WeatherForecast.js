import React from 'react'

const WeatherForecastSingle = ({ data }) => {
  const image = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  return (
    <div className="weather-forecast-single">
      <span>{Math.round(data.main.temp)}°C</span>
      <img src={image} alt="icon" />
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