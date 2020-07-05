import weatherService from '../services/weather'

const weatherReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action: ', action)
  switch (action.type) {
  case 'SET_WEATHER':
    return action.data
  default:
    return state
  }
}

export const setWeather = city => {
  return async dispatch => {
    try {
      const weatherBasic = await weatherService.getWeather(city)
      const weatherForecast = await weatherService.getForecast(city)

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
    } catch (exception) {
      dispatch({
        type: 'SET_WEATHER',
        data: {
          error: true
        }
      })
    }

  }
}

export default weatherReducer