import React from 'react'
import { Link } from 'react-router-dom'

import SearchForm from './SearchForm'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/home">home</Link>
      <SearchForm />
    </div>
  )

}

export default Navbar