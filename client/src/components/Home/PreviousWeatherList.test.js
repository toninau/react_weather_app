import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import PreviousWeatherList from './PreviousWeatherList'

//import { prettyDOM } from '@testing-library/dom'

const recentWeathers = [
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

describe('<PreviousWeatherList />', () => {
  test('render content', () => {
    const component = render(
      <Router>
        <PreviousWeatherList weathers={recentWeathers} />
      </Router>
    )

    const firstElement = component.container.querySelector('.weather-previous:nth-child(1)')
    const secondElement = component.container.querySelector('.weather-previous:nth-child(2)')
    expect(firstElement).toHaveTextContent('New York')
    expect(secondElement).toHaveTextContent('Espoo')
  })

  test('no content and clicking on element call event handler once', async () => {
    const mockHandler = jest.fn()

    const component = render(
      <Router>
        <PreviousWeatherList weathers={[]} focus={mockHandler} />
      </Router>
    )

    const ele = component.container.querySelector('#no-previous-searches')
    fireEvent.click(ele)

    expect(component.container).toHaveTextContent('no previous searches')
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('clicking the button calls event handler once', async () => {
    const mockHandler = jest.fn()

    const component = render(
      <Router>
        <PreviousWeatherList weathers={recentWeathers} removeWeather={mockHandler} />
      </Router>
    )

    const firstElement = component.container.querySelector('.weather-previous:nth-child(1)')
    const removeWeatherButton = firstElement.querySelector('button')
    fireEvent.click(removeWeatherButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})