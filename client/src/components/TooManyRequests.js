import React from 'react'
import { Link } from 'react-router-dom'

const TooManyRequests = () => {

  return (
    <div>
      <h3>you have made too many requests</h3>
      <Link to="/home">
        <p>Return to home page</p>
      </Link>
    </div>
  )
}

export default TooManyRequests