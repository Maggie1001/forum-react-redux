import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts } from '../actions/index.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Modal from 'react-modal'
import AddPostForm from './AddPostForm'


class Home extends Component {

  state = {

    posts : [],
    sortChoice : "voteHigh",
    open : false

  }

  componentWillMount(){
    this.props.getCategories()
    this.props.getPosts() 

  }

  componentWillReceiveProps(nextProps){
    this.setState({
      posts : nextProps.posts
    })  
  }


  addPost = (e) => {
    e.preventDefault()
    

  }

  modalToggle = () => {
    if(this.state.open){
      var change = false;
    }else{
      var change = true;
    }

    this.setState({
      open : change
    })

  }




  sortPosts = (e) => {
    let posts;
    if(e.target.value === "voteHigh"){
      posts = this.props.posts.sort((a,b) => {
          const keyA = a.voteScore;
          const keyB = b.voteScore;
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
      })
    }else if(e.target.value === "voteLow"){
      posts =  this.props.posts.sort((a,b) => {
          const keyA = a.voteScore;
          const keyB = b.voteScore;
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
      })
    }else{
      posts =  this.props.posts.sort((a,b) => {
          const keyA = a.timestamp;
          const keyB = b.timestamp;
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
      })  
    }

    this.setState({
      posts : posts,
      sortChoice : e.target.value
    })


  }



  render() {

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
           {this.state.posts ? (
              this.state.posts.map((post, counter) => {
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
          <button type="button" onClick={this.modalToggle}>Add Post</button>
          <Modal
            isOpen={this.state.open}
            onRequestClose={this.modalToggle}
            contentLabel="Modal"
          >
            <AddPostForm categories={this.props.categories} change={this.addPost} />
          </Modal>
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