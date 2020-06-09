import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ match }) => {
  const city = match.params.city
  const [weather, setWeather] = useState(null)
  // eslint-disable-next-line no-undef
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
      .catch(setWeather(null))
  }, [url])

  if (weather) {
    return (
      <div>
        <h3>Weather in {city}</h3>
        <p>temperature: {weather.main.temp} Celcius</p>
      </div>
    )
  }
  return (
    <div>
      <p>{city} not found</p>
    </div>
  )
}

export default Weather