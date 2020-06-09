import React from 'react'

import {
  Switch, Route, Link, useRouteMatch
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
  const match = useRouteMatch('/:city')

  return (
    <div>
      <Menu />
      <Search />
      <Switch>
        <Route path="/:city">
          <Weather match={match} />
        </Route>
        <Route path="/">
          <p>WEATHER APP</p>
        </Route>
      </Switch>
    </div>
  )
}

export default App
