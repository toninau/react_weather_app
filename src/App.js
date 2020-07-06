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

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const fetchWeather = async (city) => {
    dispatch(clearWeather())
    try {
      const weather = await weatherService.getWeather(city)
      //dispatch weathers
      const forecast = await weatherService.getForecast(city)
      dispatch(setWeather(weather, forecast))
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
