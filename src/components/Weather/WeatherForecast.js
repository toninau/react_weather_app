import React from 'react'

const WeatherForecast = ({ forecast }) => {
  const forecastData = forecast.slice(0, 4)
  return (
    <div>
      {forecastData.map(data => (
        <p key={data.dt}>temp: {data.main.temp}</p>
      ))}
    </div>
  )
}

export default WeatherForecast