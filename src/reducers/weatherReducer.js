const weatherReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_WEATHER':
    return action.data
  case 'CLEAR_WEATHER':
    return null
  default:
    return state
  }
}

export const setWeather = (basic, forecast) => {
  return async dispatch => {
    dispatch({
      type: 'SET_WEATHER',
      data: {
        basic, forecast
      }
    })
  }
}

export const clearWeather = () => (
  { type: 'CLEAR_WEATHER' }
)

export default weatherReducer