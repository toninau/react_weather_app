import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'

import WeatherBasic from './WeatherBasic'
import WeatherDetails from './WeatherDetails'

const Weather = () => {
  const { params: { city } } = useRouteMatch('/weather/:city')
  const [weatherBasic, setWeatherBasic] = useState(null)
  const [weatherDetails, setWeatherDetails] = useState(null)
  const [coord, setCoord] = useState({ lon: 0, lat: 0 })

  const [loadingBasic, setLoadingBasic] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState(true)
  const [showDetails, setShowDetails] = useState({ value: false, label: 'show more' })

  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY
  const urlBasic = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  const urlDetails = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely&appid=${API_KEY}&units=metric`

  useEffect(() => {
    setLoadingBasic(true)
    axios
      .get(urlBasic)
      .then(response => {
        setWeatherDetails(null)
        setShowDetails({ value: false, label: 'show more' })
        setWeatherBasic(response.data)
        setCoord({ lon: response.data.coord.lon, lat: response.data.coord.lat })
        setLoadingBasic(false)
      })
      .catch(() => {
        setWeatherBasic(null)
        setLoadingBasic(false)
      })
  }, [urlBasic])

  const getDetails = () => {
    if (!weatherDetails) {
      setLoadingDetails(true)
      axios
        .get(urlDetails)
        .then(response => {
          setWeatherDetails(response.data)
          setLoadingDetails(false)
        })
        .catch(() => {
          setWeatherDetails(null)
          setLoadingDetails(false)
        })
    }
    setShowDetails({ value: !showDetails.value, label: showDetails.value ? 'show more' : 'show less' })
  }

  const displayDetails = () => {
    if (loadingDetails) return <p>loading details...</p>
    if (weatherDetails) {
      return (
        <WeatherDetails weather={weatherDetails} />
      )
    }
    return <p>no weather details</p>
  }

  if (loadingBasic) return <p>loading...</p>
  if (weatherBasic) {
    return (
      <div>
        <WeatherBasic weather={weatherBasic} />
        <button onClick={() => getDetails()}>{showDetails.label}</button>
        {showDetails.value &&
          displayDetails()
        }
      </div>
    )
  }
  return (
    <div>
      <p>{city} not found</p>
    </div>
  )
}

export default Weather