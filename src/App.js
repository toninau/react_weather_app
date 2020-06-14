import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom'

import Weather from './components/Weather'
import Navbar from './components/Navbar'

// /home /weather * replacement
const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <p>Weather app home</p>
        </Route>
        <Route path="/weather/:city">
          <Weather />
        </Route>
        <Route path="/weather">
          <p>Enter city</p>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  )
}

const NoMatch = () => {
  let location = useLocation()
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default App
