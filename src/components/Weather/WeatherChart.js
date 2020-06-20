import React, { useEffect } from 'react'
import Chart from 'chart.js'

const WeatherChart = ({ weatherData }) => {
  const chartRef = React.createRef()
  const temperatureData = weatherData.map(w => w.main.temp)
  const rainData = weatherData.map(w => w.rain ? w.rain['3h'] : 0)
  const labels = weatherData.map((wd, index) => {
    const dateObject = new Date(wd.dt * 1000)
    if (index === 0 || dateObject.getHours() === 0) {
      const stringArray = [
        dateObject.toLocaleString('en-US', { weekday: 'short' }),
        dateObject.toLocaleString('en-US', { hour: 'numeric', hour12: false }),
        dateObject.toLocaleString('en-US', { day: 'numeric', month: 'numeric' })
      ]
      return stringArray
    }
    return dateObject.toLocaleString('en-US', { hour: 'numeric', hour12: false })
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
              callback: (value, index) => index === 0 ? '°C' : value
            }
          },
          {
            id: 'right-y-axis',
            type: 'linear',
            position: 'right',
            ticks: {
              suggestedMin: 0,
              suggestedMax: 14,
              callback: (value, index) => index === 0 ? 'mm' : value
            },
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      }
    })
  })

  return (
    <div>
      <canvas ref={chartRef}>
        <p>Failed to load chart</p>
      </canvas>
    </div>
  )
}

export default WeatherChart
