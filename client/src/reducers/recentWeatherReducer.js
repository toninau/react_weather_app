const recentWeathersReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_WEATHER': {
    const arr = state.filter(w => w.id !== action.data.id)
    if (arr.length > 4) {
      arr.shift()
    }
    return [ ...arr, action.data ]
  }
  case 'REMOVE_WEATHER':
    return state.filter(w => w.id !== action.id)
  default:
    return state
  }
}

export const addWeather = weather => {
  return async dispatch => {
    const weatherMinified = {
      id: weather.id,
      name: weather.name,
      icon: weather.weather[0].icon,
      desc: weather.weather[0].main,
      temp: weather.main.temp,
      localDate: weather.dt,
      userDate: new Date().getTime()
    }
    dispatch({
      type: 'ADD_WEATHER',
      data: weatherMinified
    })
  }
}

export const removeWeather = id => (
  {
    type: 'REMOVE_WEATHER',
    id
  }
)

export default recentWeathersReducer