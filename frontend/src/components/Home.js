import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts } from '../actions/index.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


class Home extends Component {

  state = {

    posts : [],
    sortChoice : "voteHigh"

  }

  componentWillMount(){
    this.props.getCategories()
    this.props.getPosts()
   
  }

  sortPosts = (e) => {
    e.preventDefault
    if(e.target.value === "voteHigh"){
      //sort by high
    }else if(e.target.value === "voteLow"){
      //sort by low
    }else{
      //sort by date
    }

  }



  render() {
    console.log(this.state.sortChoice)
    return (
      <div className="App">
        <div>
          <ul>
            {this.props.categories ? (
              this.props.categories.map((category, counter) => {
                return <li key={counter}>
                  <Link
                    to= {`/category/${category.path}`}
                    >{category.name}
                  </Link>
                </li>
              })
              ) : (
              null
              )
            }
          </ul>
        </div>

        <div>
          <div>
            <select value={this.state.sortChoice} onChange={(e) => this.sortPosts(e)}>
              <option value="date">Sort By Date</option>
              <option value="voteHigh">Order By High Votes</option>
              <option value="voteLow">Order by Low Votes</option>
            </select>
          </div>
          <ul>
           {this.props.posts ? (
              this.props.posts.map((post, counter) => {
                return <li key={counter}>
                  <Link
                    to= {`/post/${post.id}`}
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
      </div>
    );
  }
}



function mapStateToProps(state,props){
  return {
    categories : state.category.categories,
    posts : state.post.posts
  }
}

function mapDispatchToProps(dispatch){

  return{

    getCategories : getAllCategories(dispatch),
    getPosts : getAllPosts(dispatch)


  }
}





export default connect( mapStateToProps,mapDispatchToProps)(Home)