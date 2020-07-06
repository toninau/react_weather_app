import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()

  return (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
      <p>Page not found</p>
      <Link to="/home">
        <p>Return to home page</p>
      </Link>
    </div>
  )
}

export default NotFound