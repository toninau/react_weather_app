import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

  return (
    <div className="error-page">
      <h3>City not found</h3>
      <Link to="/home">
        <p>Return to home page</p>
      </Link>
    </div>
  )
}

export default NotFound