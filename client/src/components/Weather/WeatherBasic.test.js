import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import WeatherBasic from './WeatherBasic'

const weather = {
  'coord': {
    'lon': -74.01,
    'lat': 40.71
  },
  'weather': [
    {
      'id': 800,
      'main': 'Clear',
      'description': 'clear sky',
      'icon': '01n'
    }
  ],
  'base': 'stations',
  'main': {
    'temp': 18.85,
    'feels_like': 17.33,
    'temp_min': 16.11,
    'temp_max': 22,
    'pressure': 1017,
    'humidity': 60
  },
  'visibility': 10000,
  'wind': {
    'speed': 2.6,
    'deg': 40
  },
  'clouds': {
    'all': 1
  },
  'dt': 1597911043,
  'sys': {
    'type': 1,
    'id': 4610,
    'country': 'US',
    'sunrise': 1597918316,
    'sunset': 1597967222
  },
  'timezone': -14400,
  'id': 5128581,
  'name': 'New York',
  'cod': 200
}

describe('<WeatherBasic />', () => {
  let component

  beforeEach(() => {
    component = render(
      <WeatherBasic weather={weather} />
    )
  })

  test('timezone is rendered in correct format', () => {
    const date = component.container.querySelector('.weather-basic-date')
    expect(date).toHaveTextContent('As of Thursday, 08/20/2020, 08:10UTC -4')
  })

  test('temperature is rendered', () => {
    const temperatures = component.container.querySelector('.weather-basic-temp')
    expect(temperatures).toHaveTextContent('192216°C')
  })
})