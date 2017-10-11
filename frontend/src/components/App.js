import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions/index.js'

class App extends Component {


  componentDidMount(){
    this.props.getCategories()
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">

      </div>
    );
  }
}

function mapStateToProps(categories){
  return {
  }
}

function mapDispatchToProps(dispatch){

  return{

    getCategories : getAllCategories(dispatch)


  }
}



export default connect( mapStateToProps,mapDispatchToProps)(App)
