const weatherReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action: ', action)
  switch (action.type) {
  case 'SET_WEATHER':
    return action.data
  case 'CLEAR_WEATHER':
    return null
  default:
    return state
  }
}

export const setWeather = (weatherBasic, weatherForecast) => {
  return async dispatch => {
    const timezone = weatherBasic.timezone
    const basic = {
      ...weatherBasic,
      dt: weatherBasic.dt + timezone,
      sys: {
        sunrise: weatherBasic.sys.sunrise + timezone,
        sunset: weatherBasic.sys.sunset + timezone
      }
    }
    const forecast = weatherForecast.list.map(weather => {
      const weather3h = { ...weather, dt: weather.dt + timezone }
      return weather3h
    })

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