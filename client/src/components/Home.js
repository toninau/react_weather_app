import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { removeWeather } from '../reducers/recentWeatherReducer'
import { localDateString, userDateString } from '../utils/date_functions'
import { clearWeather } from '../reducers/weatherReducer'

const Home = ({ submit }) => {
  const weathers = useSelector(state => state.recentWeather)
  const dispatch = useDispatch()
  const [city, setCity] = useState('')

  useEffect(() => {
    dispatch(clearWeather())
  }, [dispatch])

  const removePreviousWeather = (id) => {
    dispatch(removeWeather(id))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submit(city)
  }

  return (
    <div className="home">
      <div className="home-search">
        <form onSubmit={handleSubmit}>
          <label>
            Search:
            <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
          </label>
          {city.length > 0 &&
            <input type="button" value="X" onClick={() => setCity('')} />
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="weather-card-previous">
        {weathers.length ?
          weathers.map(w => (
            <PreviousWeather key={w.id}
              weather={w}
              removeWeather={removePreviousWeather}
            />
          )) :
          <p>no previous searches</p>
        }
      </div>
    </div>
  )
}

const PreviousWeather = ({ weather, removeWeather }) => {
  const localTime = localDateString(weather.localDate, 'forecast')
  const userTime = userDateString(weather.userDate)

  return (
    <div className="weather-previous">
      <Link to={`weather/${weather.name}`}>
        <p>{weather.name}</p>
      </Link>
      <p>{Math.round(weather.temp)}°C</p>
      <p>{localTime}</p>
      <p>{userTime}</p>
      <button onClick={() => removeWeather(weather.id)}>remove</button>
    </div>
  )
}

Home.propTypes = {
  submit: PropTypes.func.isRequired
}

PreviousWeather.propTypes = {
  weather: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    localDate: PropTypes.number.isRequired,
    userDate: PropTypes.number.isRequired
  }).isRequired,
  removeWeather: PropTypes.func.isRequired
}

export default Home