import React, { useState } from 'react'

const Search = () => {
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (city.length > 0) {
      console.log(city)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Search