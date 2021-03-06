import React from 'react'

const WeatherSkeleton = () => {
  return (
    <div className="weather">
      <div className="weather-container-skeleton">
        <div style={{ minHeight: '413px' }} className="skeleton-card weather-card">
          <div>
            <div className="skeleton-shape" style={{ height: '32px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '128px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '90px' }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="skeleton-shape" style={{ height: '200px', width: '200px', borderRadius: '50%' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '90px' }}></div>
          </div>
        </div>
        <div style={{ minHeight: '366px' }} className="skeleton-card weather-card">
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
        </div>
        <div style={{ minHeight: '393px' }} className="skeleton-card weather-card">
          <div>
            <div className="skeleton-shape" style={{ height: '32px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '128px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '257px' }}></div>
            <div className="skeleton-shape" style={{ height: '21px', width: '90px' }}></div>
          </div>
          <div className="skeleton-shape" style={{ height: '240px', width: '183px' }}></div>
        </div>
        <div style={{ minHeight: '601px' }} className="skeleton-card weather-card">
          <div className="skeleton-shape" style={{ height: '400px', width: '100%' }}></div>
        </div>
      </div>
    </div>
  )
}

export default WeatherSkeleton