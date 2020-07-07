import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeWeather } from '../reducers/weathersReducer'
import { localDateString } from '../utils/date_functions'
import { clearWeather } from '../reducers/weatherReducer'

const Home = () => {
  const weathers = useSelector(state => state.weathers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearWeather())
  }, [dispatch])

  const removePreviousWeather = (id) => {
    dispatch(removeWeather(id))
  }

  return (
    <div>
      <div>
        <p>previous searches</p>
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
  const local = localDateString(weather.date, 'forecast')

  return (
    <div>
      <p>{weather.name}</p>
      <p>{Math.round(weather.temp)}°C</p>
      <p>{local}</p>
      <button onClick={() => removeWeather(weather.id)}>remove</button>
    </div>
  )
}

export default Home