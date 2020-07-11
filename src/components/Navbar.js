import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ submit }) => {
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    submit(city)
  }

  return (
    <div className="navbar">
      <div className="navbar-items">
        <Link to="/home">home</Link>
        <form onSubmit={handleSubmit}>
          <label>
            Search:
            <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
          </label>
          {city.length > 0 &&
            <input type="button" value="X" onClick={() => setCity('')} />
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default Navbar