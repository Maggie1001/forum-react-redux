import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import NotFound from './NotFound'
import NavBar from './NavBar'
import '../App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => {

  return(
      <div>
        <MuiThemeProvider>
          <Route component={NavBar}/>
        </MuiThemeProvider>
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

export default withRouter(App)
