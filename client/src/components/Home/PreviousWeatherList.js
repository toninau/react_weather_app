import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group'

import { localDateString, userDateString } from '../../utils/date_functions'

const PreviousWeatherList = ({ weathers, removeWeather, focus }) => {
  return (
    <div className="weather-card-previous">
      <SwitchTransition>
        <CSSTransition
          key={weathers.length ? 'list' : 'empty'}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          classNames='fade'>
          <div className="scroll-box">
            {weathers.length ?
              <TransitionGroup component={null}>
                {weathers.map(w => (
                  <CSSTransition
                    key={w.id}
                    timeout={500}
                    enter={false}
                    classNames="item">
                    <PreviousWeather
                      weather={w}
                      removeWeather={removeWeather}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup> :
              <div id="no-previous-searches" onClick={focus}>
                <h2>no previous searches</h2>
                <p>start by entering a location above</p>
              </div>
            }
          </div>
        </CSSTransition>
      </SwitchTransition>
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
            <img title={weather.desc} src={image} alt={`${weather.desc} icon`} />
          </div>
          <table>
            <tbody>
              <tr>
                <th title="Date of data in local time">
                  <i className="material-icons">public</i>
                </th>
                <th title="Date of search">
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
    desc: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    localDate: PropTypes.number.isRequired,
    userDate: PropTypes.number.isRequired
  }).isRequired,
  removeWeather: PropTypes.func.isRequired
}

export default PreviousWeatherList