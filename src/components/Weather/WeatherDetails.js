import React from 'react'

const WeatherDetails = ({ weather }) => {
  return (
    <div>
      <h2>details</h2>
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

export default WeatherDetails