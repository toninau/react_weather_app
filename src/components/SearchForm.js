import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Search = () => {
  const history = useHistory()
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (city.length > 0) {
      history.push(`/weather/${city}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
      </label>
      <input type="button" value="X" onClick={() => setCity('')} />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Search