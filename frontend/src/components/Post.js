import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { getPost } from '../actions/index.js'


class Post extends Component {


  componentDidMount(){
    let post = this.props.match.params.post
    this.props.getPost({post})
  }


  render() {
    return (
      <div>
        {this.props.post ? (
          <div>
            {this.props.post.post}
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
    post : state.post.post
  }
}

function mapDispatchToProps(dispatch){
  return{

    getPost : post => dispatch(getPost(post))

  }
}





export default connect( mapStateToProps,mapDispatchToProps)(Post)