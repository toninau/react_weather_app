import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { removeWeather } from '../reducers/recentWeatherReducer'
import { localDateString, userDateString } from '../utils/date_functions'
import { clearWeather } from '../reducers/weatherReducer'

const Home = () => {
  const weathers = useSelector(state => state.recentWeather)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearWeather())
  }, [dispatch])

  const removePreviousWeather = (id) => {
    dispatch(removeWeather(id))
  }

  return (
    <div className="home">
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