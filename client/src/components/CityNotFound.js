import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

  return (
    <div>
      <h3>city not found</h3>
      <Link to="/home">
        <p>Return to home page</p>
      </Link>
    </div>
  )
}

export default NotFound