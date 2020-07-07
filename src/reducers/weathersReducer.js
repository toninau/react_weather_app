const weathersReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action: ', action)
  switch (action.type) {
  case 'ADD_WEATHER': {
    if (!state.some((w => w.id === action.data.id))) {
      return [...state, action.data]
    }
    return state.map(w => w.id === action.data.id ? action.data : w)
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
      temp: weather.main.temp,
      date: weather.dt
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

export default weathersReducer