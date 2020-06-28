import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Weather from './components/Weather'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/weather/:city">
          <Weather />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
