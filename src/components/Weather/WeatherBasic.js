import React from 'react'

const WeatherBasic = ({ weather }) => {
  const image = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  const date = new Date(weather.dt * 1000).toLocaleString('en-US')
  const local = new Date((weather.dt + weather.timezone) * 1000).toUTCString()
  return (
    <div className="weather-card">
      <h2>Weather in {weather.name}</h2>
      <div>
        <p>as of {date}</p>
        <p>local: {local}</p>
      </div>
      <div className="weather-basic-info">
        <div className="weather-basic-temp">
          <span>{Math.round(weather.main.temp)}</span>
          <div className="weather-basic-minmax">
            <span>{Math.round(weather.main.temp_max)}</span>
            <span>{Math.round(weather.main.temp_min)}</span>
          </div>
          <span>°C</span>
        </div>
        <div className="weather-basic-desc">
          <img src={image} alt="icon" />
          <span>{weather.weather[0].main}</span>
          <span>{weather.weather[0].description}</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherBasic