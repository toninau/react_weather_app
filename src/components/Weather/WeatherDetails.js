import React from 'react'

const WeatherDetails = ({ weather }) => {
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleString('en-US')
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleString('en-US')
  return (
    <div>
      <h2>details</h2>
      <p>feels like: {weather.main.feels_like}</p>
      <ul>
        <li>sunrise: {sunrise}</li>
        <li>sunset: {sunset}</li>
      </ul>
      <p>humidity: {weather.main.humidity} %</p>
      <p>wind: {weather.wind.speed} {weather.wind.deg}</p>
    </div>
  )
}

export default WeatherDetails