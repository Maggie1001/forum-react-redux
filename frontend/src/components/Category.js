import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { getCategory } from '../actions/index.js'


class Category extends Component {


  componentDidMount(){
    let category = this.props.match.params.category
    this.props.getCategory({category})
  }


  render() {

    return (
      <div>
        {this.props.category ? (
          <div>
            {this.props.category.category}
          </div>

        ) : (

          null

        )
      }
      </div>
    );
  }
}

function mapStateToProps(state,props){
  return {
    category : state.category.category
  }
}

function mapDispatchToProps(dispatch){
  return{

    getCategory : category => dispatch(getCategory(category))

  }
}





export default connect( mapStateToProps,mapDispatchToProps)(Category)