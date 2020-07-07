import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import weatherReducer from './reducers/weatherReducer'
import weathersReducer from './reducers/weathersReducer'

import { loadState } from './utils/localStorage'

const reducer = combineReducers({
  weather: weatherReducer,
  weathers: weathersReducer
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