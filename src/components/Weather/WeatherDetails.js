import React, { useEffect } from 'react'
import Chart from 'chart.js'

const WeatherChart = ({ weatherData }) => {
  const chartRef = React.createRef()
  const data = weatherData.map(w => w.main.temp)
  const labels = weatherData.map(w => {
    const dateObject = new Date(w.dt * 1000)
    return dateObject.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    })
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
            backgroundColor: 'rgba(255, 204, 0, 0.2)',
            borderColor: 'rgba(255, 204, 0, 1)'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
      }
    })
  })

  return (
    <div style={{ width: '600px' }}>
      <canvas ref={chartRef}>
        <p>Failed to load chart</p>
      </canvas>
    </div>
  )
}

const WeatherDetails = ({ weather }) => {
  return (
    <div>
      <h2>details</h2>
      <WeatherChart weatherData={weather.list} />
    </div>
  )
}

export default WeatherDetails