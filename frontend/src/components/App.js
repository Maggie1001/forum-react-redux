import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        Hello World
      </div>
    );
  }
}


function mapStateToProps(categories){

  return{
    categories
  }



}

export default connect(mapStateToProps)(App)
