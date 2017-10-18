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
        <Route path="/category/:category" component={Category}/>
        <Route path="/post/:post" component={Post}/>
      </div>
    )
  }

export default App
