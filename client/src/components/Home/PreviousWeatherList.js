import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { localDateString, userDateString } from '../../utils/date_functions'

const PreviousWeatherList = ({ weathers, removeWeather, focus }) => {

  return (
    <div className="weather-card-previous">
      <div className="scroll-box">
        {weathers.length ?
          weathers.map(w => (
            <PreviousWeather key={w.id}
              weather={w}
              removeWeather={removeWeather}
            />
          )) :
          <div id="no-previous-searches" onClick={focus}>
            <h2>no previous searches</h2>
            <p>start by entering a location above</p>
          </div>
        }
      </div>
    </div>
  )
}

const PreviousWeather = ({ weather, removeWeather }) => {
  const localTime = localDateString(weather.localDate, 'forecast')
  const userTime = userDateString(weather.userDate)
  const image = `http://openweathermap.org/img/wn/${weather.icon}.png`

  return (
    <div className="weather-previous">
      <Link to={`weather/${weather.name}`}>
        <div className="weather-previous-zone">
          <h3>{weather.name}</h3>
          <div className="weather-previous-info">
            <p className="weather-previous-temp">{Math.round(weather.temp)}°C</p>
            <img src={image} alt="weather icon" />
          </div>
          <table>
            <tbody>
              <tr>
                <th>
                  <i className="material-icons">public</i>
                </th>
                <th>
                  <i className="material-icons">face</i>
                </th>
              </tr>
              <tr>
                <td>{localTime}</td>
                <td>{userTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Link>
      <button className="icon2" onClick={() => removeWeather(weather.id)}>
        <i className="material-icons">remove</i>
      </button>
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

export default PreviousWeatherList