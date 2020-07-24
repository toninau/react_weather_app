import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SearchForm = ({ handleSubmit }) => {
  const [city, setCity] = useState('')

  const submit = (event) => {
    event.preventDefault()
    handleSubmit(city)
  }

  return (
    <form className="home-search" onSubmit={submit}>
      <button className="icon">
        <i className="material-icons">search</i>
      </button>
      <div className="search-field">
        <input type="text" placeholder="Search..." value={city}
          onChange={({ target }) => setCity(target.value)} />
        <i className="material-icons" id="search-field-icon">radio_button_checked</i>
      </div>
      <button type="button" className="icon" onClick={() => setCity('')}>
        <i className="material-icons">close</i>
      </button>
    </form>
  )
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default SearchForm