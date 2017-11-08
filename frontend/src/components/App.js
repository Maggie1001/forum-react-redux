import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts} from '../actions/index.js'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import NotFound from './NotFound'
import '../App.css'

class App extends Component {



  noCategory = () => {
    console.log("category")
    let candidate = window.location.pathname.split("/")[1];
    if(this.props.categories){
      return this.props.categories.filter(category => category.name === candidate).length < 1
    }
  }


  noPost = () => {
    console.log("post")
    let candidate = window.location.pathname.split("/")[2];
    if(this.props.posts){
      return this.props.posts.filter(post => post.id === candidate).length < 1
    }
  }


  componentWillMount(){
    this.props.getCategories()
    this.props.getPosts()
  }


  render(){

      if(window.location.pathname !== "/" && this.noCategory() && this.noPost()){
        console.log("hi")
      }
      return(
          <div>
            <Switch>
                <Route exact path='/' render={() => (
                  <Home/>
                )}/>
                <Route exact path="/:category/:post" component={Post}/>
                <Route exact path="/:category" component={Category}/>
     
            </Switch>
          </div>
        )
      }
}

function mapStateToProps(state,props){
  return {
    categories : state.category.categories,
    posts : state.post.posts,
  }
}

function mapDispatchToProps(dispatch){

  return{

    getCategories : getAllCategories(dispatch),
    getPosts : getAllPosts(dispatch),

  }
}





export default connect( mapStateToProps,mapDispatchToProps)(App)
