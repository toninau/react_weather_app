import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import weatherReducer from './reducers/weatherReducer'
import recentWeatherReducer from './reducers/recentWeatherReducer'

import { loadState } from './utils/localStorage'

const reducer = combineReducers({
  weather: weatherReducer,
  recentWeather: recentWeatherReducer
})

const persistedState = loadState()

const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store