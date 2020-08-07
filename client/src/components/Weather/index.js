import React, { useEffect, useRef, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import WeatherBasic from './WeatherBasic'
import WeatherDetails from './WeatherDetails'
import WeatherChart from './WeatherChart'
import WeatherForecast from './WeatherForecast'
import WeatherSkeleton from './WeatherSkeleton'

import './weather.css'

const Weather = ({ fetchWeather }) => {
  const { params: { city } } = useRouteMatch('/weather/:city')
  const weather = useSelector(state => state.weather)

  const [visibleSection, setVisibleSection] = useState(null)

  const basicRef = useRef(null)
  const forecastRef = useRef(null)
  const detailsRef = useRef(null)
  const chartRef = useRef(null)

  const sectionRefs = [
    { section: 'Basic', ref: basicRef },
    { section: 'Forecast', ref: forecastRef },
    { section: 'Details', ref: detailsRef },
    { section: 'Chart', ref: chartRef }
  ]

  useEffect(() => {
    fetchWeather(city)
  }, [city, fetchWeather])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160

      const selected = sectionRefs.find(section => {
        const ele = section.ref.current
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele)
          return scrollPosition > offsetTop && scrollPosition < offsetBottom
        }
        return null
      })

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleSection, sectionRefs])

  const getDimensions = ele => {
    const { height } = ele.getBoundingClientRect()
    const offsetTop = ele.offsetTop
    const offsetBottom = offsetTop + height

    return {
      height,
      offsetTop,
      offsetBottom,
    }
  }

  const scrollTo = element => {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 120,
      behavior: 'smooth'
    })
  }


  if (weather) {
    return (
      <div className="weather">
        <div className="weather-links">
          <button
            onClick={() => scrollTo(basicRef.current)}
            className={`link-button ${visibleSection === 'Basic' ? 'selected' : ''}`}>
            basic
          </button>
          <button
            onClick={() => scrollTo(forecastRef.current)}
            className={`link-button ${visibleSection === 'Forecast' ? 'selected' : ''}`}>
            forecast
          </button>
          <button
            onClick={() => scrollTo(detailsRef.current)}
            className={`link-button ${visibleSection === 'Details' ? 'selected' : ''}`}>
            details
          </button>
          <button
            onClick={() => scrollTo(chartRef.current)}
            className={`link-button ${visibleSection === 'Chart' ? 'selected' : ''}`}>
            chart
          </button>
        </div>
        <div className="weather-container">
          <WeatherBasic ref={basicRef} weather={weather.basic} />
          <WeatherForecast ref={forecastRef} forecast={weather.forecast} />
          <WeatherDetails ref={detailsRef} weather={weather.basic} />
          <WeatherChart ref={chartRef} weatherData={weather.forecast} />
        </div>
      </div>
    )
  }
  return <WeatherSkeleton />
}

Weather.propTypes = {
  fetchWeather: PropTypes.func.isRequired
}

export default Weather