import React from 'react'

const WeatherBasic = ({ weather }) => {
  const image = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <h3>Temperatures</h3>
      <ul>
        <li>temperature: {weather.main.temp}&#176;C</li>
        <li>max: {weather.main.temp_max}&#176;C</li>
        <li>min: {weather.main.temp_min}&#176;C</li>
      </ul>
      <h3>Info</h3>
      <p>{weather.weather[0].description}</p>
      <img src={image} alt="icon" />
    </div>
  )
}

export default WeatherBasic