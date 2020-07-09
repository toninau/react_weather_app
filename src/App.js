import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Weather from './components/Weather'
import Navbar from './components/Navbar'
import PageNotFound from './components/PageNotFound'
import CityNotFound from './components/CityNotFound'
import Footer from './components/Footer'
import Home from './components/Home'

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
    } catch (exception) {
      history.push('/not_found')
    }
  }

  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/weather/:city">
          <Weather fetchWeather={fetchWeather} />
        </Route>
        <Route path="/not_found">
          <CityNotFound />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
