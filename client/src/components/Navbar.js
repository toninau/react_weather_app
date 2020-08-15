import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ submit }) => {
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    submit(city)
    setCity('')
  }

  return (
    <div className="navbar">
      <div className="navbar-items">
        <Link to="/home">
          <i id="home-icon" className="material-icons">home</i>
        </Link>
        <form className="navbar-search" onSubmit={handleSubmit}>
          <button id="navbar-icon">
            <i className="material-icons">search</i>
          </button>
          <div className="navbar-input">
            <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
            {city.length > 0 &&
              <button type="button" onClick={() => setCity('')}>
                <i className="material-icons">close</i>
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

Navbar.propTypes = {
  submit: PropTypes.func.isRequired
}

export default Navbar