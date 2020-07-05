import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Navbar = () => {
  const history = useHistory()
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (city.length > 0) {
      history.push(`/weather/${city}`)
    }
  }

  return (
    <div className="navbar">
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
  )
}

export default Navbar