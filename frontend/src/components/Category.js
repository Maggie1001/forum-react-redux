import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { getCategory, postsByCategory } from '../actions/index.js'



class Category extends Component {


  componentDidMount(){
    let category = this.props.match.params.category
    this.props.getPostCategories(category)
  }


  render() {
    
    return (
      <div className="category-wrapper">
        {this.props.match.params.category ? (
            <h1>{this.props.match.params.category}</h1>

        ) : (

          null

        )
      }
      <ul>
      {this.props.posts ? (
        this.props.posts.map((post, counter) => {
          return <li key={counter}>
                  <Link
                    to= {`/${post.category}/${post.id}`}
                    >{post.title}
                  </Link>
                </li>
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
    category : state.category.category,
    posts : state.post.posts
  }
}

function mapDispatchToProps(dispatch){
  return{

    getPostCategories : category => dispatch(postsByCategory(category))

  }
}





export default connect( mapStateToProps,mapDispatchToProps)(Category)