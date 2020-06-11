import React from 'react'
import { Link } from 'react-router-dom'

import SearchForm from './SearchForm'

const Navbar = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <SearchForm />
    </div>
  )

}

export default Navbar