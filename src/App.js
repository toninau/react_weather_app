import React from 'react'
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from 'react-router-dom'

import Search from './components/SearchForm'
import Weather from './components/Weather'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">home</Link>
    </div>
  )
}

// /home /location * replacement
const App = () => {
  return (
    <div>
      <Menu />
      <Search />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <p>Weather app home</p>
        </Route>
        <Route path="/location/:city">
          <Weather />
        </Route>
        <Route path="/location">
          <p>Enter location</p>
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
