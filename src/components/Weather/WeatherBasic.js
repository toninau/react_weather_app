import React from 'react'

const WeatherBasic = ({ weather }) => {
  const image = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
  const date = new Date((weather.dt + weather.timezone) * 1000)
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false
  })
  const dateFormatted = formatter.format(date)

  return (
    <div className="weather-card">
      <div className="weather-basic">
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
            <p>local time {dateFormatted}</p>
          </div>
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