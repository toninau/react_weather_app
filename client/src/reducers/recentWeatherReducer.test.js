import recentWeatherReducer from './recentWeatherReducer'
import deepFreeze from 'deep-freeze'

describe('recentWeatherReducer', () => {
  test('return new state with action ADD_WEATHER', () => {
    const state = []
    const action = {
      type: 'ADD_WEATHER',
      data: {
        desc: 'Rain',
        icon: '10d',
        id: 5128581,
        localDate: 1597570883,
        name: 'New York',
        temp: 20.47,
        userDate: 1597585501421
      }
    }

    deepFreeze(state)
    const newState = recentWeatherReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action REMOVE_WEATHER', () => {
    const state = [
      {
        desc: 'Rain',
        icon: '10d',
        id: 5128581,
        localDate: 1597570883,
        name: 'New York',
        temp: 20.47,
        userDate: 1597585501421
      },
      {
        desc: 'Clear',
        icon: '01d',
        id: 660129,
        localDate: 1597688402,
        name: 'Espoo',
        temp: 23.14,
        userDate: 1597678105526
      }
    ]

    const action = {
      type: 'REMOVE_WEATHER',
      id: 5128581
    }

    deepFreeze(state)
    const newState = recentWeatherReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(state[1])
  })

  test('oldest value is removed and newest is added when max limit (5) is hit', () => {
    const state = [
      {
        desc: 'Rain',
        icon: '10d',
        id: 5128581,
        localDate: 1597570883,
        name: 'New York',
        temp: 20.47,
        userDate: 1597585501421
      },
      {
        desc: 'Clear',
        icon: '01d',
        id: 660129,
        localDate: 1597688402,
        name: 'Espoo',
        temp: 23.14,
        userDate: 1597678105526
      },
      {
        desc: 'Clouds',
        icon: '02d',
        id: 633592,
        localDate: 1597752773,
        name: 'Rajamäki',
        temp: 21.15,
        userDate: 1597741972251,
      },
      {
        desc: 'Clouds',
        icon: '03d',
        id: 2988507,
        localDate: 1597757564,
        name: 'Paris',
        temp: 23.53,
        userDate: 1597750644348,
      },
      {
        desc: 'Clouds',
        icon: '02d',
        id: 658225,
        localDate: 1597858274,
        name: 'Helsinki',
        temp: 21.97,
        userDate: 1597848144744,
      }
    ]

    const action = {
      type: 'ADD_WEATHER',
      data: {
        desc: 'Clouds',
        icon: '04d',
        id: 3143244,
        localDate: 1598005019,
        name: 'Oslo',
        temp: 17.56,
        userDate: 1597998616211,
      }
    }

    deepFreeze(state)
    const newState = recentWeatherReducer(state, action)

    expect(newState).toHaveLength(5)
    expect(newState).not.toContainEqual(state[0])
    expect(newState).toContainEqual(action.data)
  })
})