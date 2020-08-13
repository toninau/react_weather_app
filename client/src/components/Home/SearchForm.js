import React, { useState, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const SearchForm = React.forwardRef(({ handleSubmit }, ref) => {
  const [city, setCity] = useState('')
  const inputField = useRef(null)

  const submit = (event) => {
    event.preventDefault()
    handleSubmit(city)
  }

  const focusOnInput = () => {
    inputField.current.focus()
  }

  useImperativeHandle(ref, () => {
    return {
      focusOnInput
    }
  })

  return (
    <form className="home-search" onSubmit={submit}>
      <button className="icon">
        <i className="material-icons">search</i>
      </button>
      <div className="search-field">
        <input ref={inputField} type="text" placeholder="Search" value={city}
          onChange={({ target }) => setCity(target.value)} />
        <i className="material-icons" id="search-field-icon">radio_button_checked</i>
      </div>
      <button type="button" className="icon" onClick={() => setCity('')}>
        <i className="material-icons">close</i>
      </button>
    </form>
  )
})

SearchForm.displayName = 'SearchForm'

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default SearchForm