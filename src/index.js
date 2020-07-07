import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import { saveState } from './utils/localStorage'
import throttle from 'lodash/throttle'

store.subscribe(throttle(() => {
  saveState({
    weathers: store.getState().weathers
  })
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)