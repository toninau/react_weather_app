import React from 'react'

const WeatherSkeleton = () => {
  return (
    <div className="weather">
      <div className="weather-container-skeleton">
        <div className="skeleton-card weather-card">
          <div>
            <div className="skeleton-shape" style={{ height: '32px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '128px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '90px' }}></div>
          </div>
          <div>
            <div className="skeleton-shape" style={{ height: '21px', width: '50px' }}></div>
            <div className="skeleton-shape" style={{ height: '200px', width: '200px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '90px' }}></div>
          </div>
        </div>
        <div className="skeleton-card weather-card">
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
        </div>
        <div className="skeleton-card weather-card">
          <div>
            <div className="skeleton-shape" style={{ height: '32px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '128px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '90px' }}></div>
          </div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
        </div>
        <div className="skeleton-card weather-card">
          <div className="skeleton-shape" style={{ height: '400px', width: '100%' }}></div>
        </div>
      </div>
    </div>
  )
}

export default WeatherSkeleton