import React from 'react'

const WeatherSkeleton = () => {
  return (
    <div className="weather">
      <div className="weather-links">
        <a href="#basic">basic</a>
        <a href="#forecast">forecast</a>
        <a href="#details">details</a>
        <a href="#chart">chart</a>
      </div>
      <div className="weather-container-skeleton">
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
      </div>
    </div>
  )
}

export default WeatherSkeleton