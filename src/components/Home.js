import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeWeather } from '../reducers/weathersReducer'

const Home = () => {
  const weathers = useSelector(state => state.weathers)
  const dispatch = useDispatch()

  return (
    <div>
      <p>weather home page</p>
      {weathers.map(w => (
        <div key={w.id}>
          <p>{JSON.stringify(w)}</p>
          <button onClick={() => dispatch(removeWeather(w.id))}>remove</button>
        </div>
      ))}
    </div>
  )
}

export default Home