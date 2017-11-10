import React from 'react'
import { Route, Link } from 'react-router-dom'


const NotFound = () => {

  return(
      <div>
        <p>Oops! wrong place. There is nothing to see here</p>
        <Link to= '/'>Home</Link>
      </div>
    )
  }
export default NotFound