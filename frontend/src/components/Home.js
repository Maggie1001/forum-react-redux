import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts, addPost, votePost, getComments } from '../actions/index.js'
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
    if(this.props.posts){
      this.findComments(this.props.posts)
    }

  }

  componentWillReceiveProps(nextProps){
    this.setState({
      posts : nextProps.posts
    })  
  }

  findComments = (posts) => {
    for(post in posts){
      this.props.getComments(post.id)
    } 
    
  }


  sortComments = () => {

  }

  addPost = (e,info) => {
    e.preventDefault()
    this.props.createPost(info)
    this.modalToggle()

  }

    upPostVote = () =>{
    this.props.votePost(this.props.post.id, "upVote")

  }

  downPostVote = () =>{
    this.props.votePost(this.props.post.id, "downVote")

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
      <h1>CATEGORIES</h1>
        <div className="categories-list-home">
          <ul>
            {this.props.categories ? (
              this.props.categories.map((category, counter) => {
                return <li key={counter}>
                  <Link
                    to= {`/${category.path}`}
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


        <h1>POSTS</h1>
        <div className="categories-home">
            <div className="home-select">
              <select value={this.state.sortChoice} onChange={(e) => this.sortPosts(e)}>
                <option value="date">Sort By Date</option>
                <option value="voteHigh">Order By High Votes</option>
                <option value="voteLow">Order by Low Votes</option>
              </select>
            </div>
          <ul className="post-list-home">
           {this.state.posts ? (
              this.state.posts.map((post, counter) => {
                return <li key={counter}>
                  <Link
                    to= {`/${post.category}/${post.id}`}
                    >{post.title}
                  </Link>
                  <div className="post-info">
                    <span>Author: {post.author}</span>
                    {this.props.comments ? (

                      <span> Comment Count: {this.props.comments.length}</span>
                    ) : (
                      null
                    )}
                  </div>
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
  console.log(state.comment.comments)
  return {
    categories : state.category.categories,
    posts : state.post.posts,
    comments : state.comment.comments
  }
}

function mapDispatchToProps(dispatch){

  return{

    getCategories : getAllCategories(dispatch),
    getPosts : getAllPosts(dispatch),
    createPost : (data) => dispatch(addPost(data)),
    getComments : post => dispatch(getComments(post)),
    votePost : (post, option) => dispatch(votePost(post,option))


  }
}





export default connect( mapStateToProps,mapDispatchToProps)(Home)