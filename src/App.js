import React from 'react'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
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

const App = () => {
  const match = useRouteMatch('/location/:city')

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
          <Weather match={match} />
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
