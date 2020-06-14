import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherDetails = ({ coord }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely&appid=${API_KEY}&units=metric`

  useEffect(() => {
    setLoading(true)
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
        setLoading(false)
      })
      .catch(() => {
        setWeather(null)
        setLoading(false)
      })
  }, [url])

  if (loading) return 'loading...'
  if (weather) {
    return (
      <div>
        <h2>details</h2>
        <p>{coord.lat} {coord.lon}</p>
        <div>
          {weather.daily.map(w => (
            <div key={w.dt}>
              <ul>
                <li>{w.temp.day}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default WeatherDetails