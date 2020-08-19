import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SearchForm from './SearchForm'

describe('<SearchForm />', () => {
  test('updates state and calls handleSubmit', async () => {
    const handleSubmit = jest.fn()

    const component = render(
      <SearchForm handleSubmit={handleSubmit} />
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
      target: { value: 'London' }
    })
    fireEvent.submit(form)

    expect(handleSubmit.mock.calls).toHaveLength(1)
    expect(handleSubmit.mock.calls[0][0]).toBe('London')
  })

  test('empties input field when clear button is pressed', async () => {
    const mockHandler = jest.fn()

    const component = render(
      <SearchForm handleSubmit={mockHandler} />
    )

    const input = component.container.querySelector('input')

    fireEvent.change(input, {
      target: { value: 'London' }
    })

    const clearButton = component.container.querySelector('button:last-child')
    fireEvent.click(clearButton)

    expect(input.value).toBe('')
  })
})