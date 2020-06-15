import React, { useEffect } from 'react'
import Chart from 'chart.js'

const WeatherGraph = ({ weatherData }) => {
  const chartRef = React.createRef()
  const data = weatherData.map(w => w.temp.day)
  const labels = weatherData.map(w => {
    const dateObject = new Date(w.dt * 1000)
    return dateObject.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric' })
  })

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d')
    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperatures',
            data: data,
          }
        ]
      },
      options: {
      }
    })
  })

  return (
    <div>
      <canvas
        ref={chartRef}
      />
    </div>
  )
}

const WeatherDetails = ({ weather }) => {
  return (
    <div>
      <h2>details</h2>
      <WeatherGraph weatherData={weather.daily} />
    </div>
  )
}

export default WeatherDetails