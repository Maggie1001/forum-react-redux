import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import '../App.css'

const App = () => {

  return(
      <div>
        <Route exact path='/' render={() => (
          <Home/>
        )}/>
        <Route exact path="/:category/:post" component={Post}/>
        <Route exact path="/:category" component={Category}/>
      </div>
    )
  }

export default App
