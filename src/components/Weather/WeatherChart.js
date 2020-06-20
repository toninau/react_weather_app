import React, { useEffect } from 'react'
import Chart from 'chart.js'

const WeatherChart = ({ weatherData }) => {
  const chartRef = React.createRef()
  const temperatureData = weatherData.map(w => w.main.temp)
  const rainData = weatherData.map(w => w.rain ? w.rain['3h'] : 0)
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
            label: 'temperature',
            data: temperatureData,
            backgroundColor: 'rgba(255, 204, 0, 0.2)',
            borderColor: 'rgba(255, 204, 0, 1)',
            order: 1,
            yAxisID: 'left-y-axis'
          },
          {
            label: 'rain',
            data: rainData,
            backgroundColor: 'rgba(0, 154, 255, 0.8)',
            borderColor: 'rgba(0, 154, 255, 1)',
            type: 'bar',
            order: 2,
            yAxisID: 'right-y-axis'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            id: 'left-y-axis',
            type: 'linear',
            position: 'left',
            ticks: {
              suggestedMin: 0,
              suggestedMax: 35
            }
          },
          {
            id: 'right-y-axis',
            type: 'linear',
            position: 'right',
            ticks: {
              suggestedMin: 0,
              suggestedMax: 14
            }
          }]
        }
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

export default WeatherChart
