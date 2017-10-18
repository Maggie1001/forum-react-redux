import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions/index.js'

class App extends Component {

  state = {

    categories : []

  }


  componentWillMount(){
    this.props.getCategories()
   
  }


  render() {
    console.log(this.props.categories)
    return (
      <div className="App">
      <ul>
        {this.props.categories ? (
          this.props.categories.map((category) => {
            return <li>{category.path}</li>

          })
          ) : (
          null
          )
        }
      </ul>
      </div>
    );
  }
}

function mapStateToProps(state,props){
  return {
    categories : state.post.categories
  }
}

function mapDispatchToProps(dispatch){

  return{

    getCategories : getAllCategories(dispatch)


  }
}





export default connect( mapStateToProps,mapDispatchToProps)(App)
