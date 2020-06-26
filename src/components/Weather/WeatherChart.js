import React, { useState } from 'react'
import Chart from 'chart.js'

import { useMountEffect } from '../../hooks'
import { localDateString } from '../../utils/date_functions'

const WeatherChart = ({ weatherData }) => {
  const chartRef = React.createRef()
  const temperatureData = weatherData.map(w => w.main.temp)
  const rainData = weatherData.map(w => w.rain ? w.rain['3h'] : 0)
  const labels = weatherData.map((wd, index) => {
    const dateObject = new Date(wd.dt * 1000)
    if (index === 0 || dateObject.getHours() === 0) {
      const stringArray = [
        dateObject.toLocaleString('en-US', { weekday: 'short', timeZone: 'UTC' }),
        dateObject.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'UTC' }),
        dateObject.toLocaleString('en-US', { day: 'numeric', month: 'numeric', timeZone: 'UTC' })
      ]
      return stringArray
    }
    return dateObject.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'UTC' })
  })
  const [weather, setWeather] = useState(weatherData[0])

  useMountEffect(() => {
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
            yAxisID: 'left-y-axis',
            fill: 'start'
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
        aspectRatio: 1,
        maintainAspectRatio: false,
        onClick: (_, elements) => (elements.length) &&
          setWeather(weatherData[elements[0]._index]),
        animation: {
          duration: 0
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        elements: {
          point: {
            radius: 5,
            hitRadius: 20,
            hoverRadius: 10
          }
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
              beginAtZero: true,
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
    <div className="weather-card-chart">
      <div>
        <WeatherChartInfo weather={weather} />
      </div>
      <div style={{ overflowX: 'scroll' }}>
        <div style={{ width: '1500px' }}>
          <canvas ref={chartRef}>
            <p>Failed to load chart</p>
          </canvas>
        </div>
      </div>
    </div>
  )
}

const WeatherChartInfo = ({ weather }) => {
  const date = localDateString(weather.dt, 'basic')
  const image = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div className="weather-chart-info">
      <div className="weather-chart-date">
        <span>{date}</span>
      </div>
      <div className="weather-chart-temperature">
        <span id="temp">{Math.round(weather.main.temp)}</span>
        <div className="weather-chart-minmax">
          <span>{Math.round(weather.main.temp_max)}</span>
          <span>{Math.round(weather.main.temp_min)}</span>
        </div>
        <span id="unit">°C</span>
      </div>
      <div className="weather-chart-desc">
        <img src={image} alt={`Icon ${weather.weather[0].description}`} />
        <span>{weather.weather[0].main}</span>
        <span>{weather.weather[0].description}</span>
      </div>
    </div>
  )
}

export default WeatherChart
