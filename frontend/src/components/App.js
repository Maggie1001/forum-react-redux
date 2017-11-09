import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import NotFound from './NotFound'
import '../App.css'

const App = () => {

  return(
      <div>
        <Switch>
            <Route exact path='/' render={() => (
              <Home/>
            )}/>
            <Route exact path="/404" component={NotFound}/>
            <Route exact path="/:category/:post" component={Post}/>
            <Route exact path="/:category" component={Category}/>
            <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }

export default App
