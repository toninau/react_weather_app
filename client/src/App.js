import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Weather from './components/Weather'
import Navbar from './components/Navbar'
import PageNotFound from './components/PageNotFound'
import CityNotFound from './components/CityNotFound'
import Footer from './components/Footer'
import Home from './components/Home'
import TooManyRequests from './components/TooManyRequests'

import weatherService from './services/weather'
import { setWeather, clearWeather } from './reducers/weatherReducer'
import { addWeather } from './reducers/recentWeatherReducer'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const timezoneFix = (weatherBasic, weatherForecast) => {
    const timezone = weatherBasic.timezone
    const basic = {
      ...weatherBasic,
      dt: weatherBasic.dt + timezone,
      sys: {
        sunrise: weatherBasic.sys.sunrise + timezone,
        sunset: weatherBasic.sys.sunset + timezone
      }
    }
    const forecast = weatherForecast.list.map(weather => {
      const weather3h = { ...weather, dt: weather.dt + timezone }
      return weather3h
    })
    return { basic, forecast }
  }

  const fetchWeather = async (city) => {
    dispatch(clearWeather())
    try {
      const weatherBasic = await weatherService.getWeather(city)
      const weatherForecast = await weatherService.getForecast(city)
      const { basic, forecast } = timezoneFix(weatherBasic, weatherForecast)
      dispatch(addWeather(basic))
      dispatch(setWeather(basic, forecast))
    } catch (error) {
      if (error.response.status === 429) {
        history.push('/no_more')
      } else {
        history.push('/not_found')
      }
    }
  }

  const submit = (city) => {
    if (city.length > 0) {
      history.push(`/weather/${city}`)
    }
  }

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home submit={submit} />
        </Route>
        <Route path="/weather/:city">
          <div className="container">
            <Navbar submit={submit} />
            <Weather fetchWeather={fetchWeather} />
          </div>
        </Route>
        <Route path="/not_found">
          <CityNotFound />
        </Route>
        <Route path="/no_more">
          <TooManyRequests />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  )
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default App
