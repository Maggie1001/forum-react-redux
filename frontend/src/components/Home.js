import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts, addPost, votePostHome, getComments, editPostHome } from '../actions/index.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Modal from 'react-modal'
import AddPostForm from './AddPostForm'
import EditPostForm from './editPostForm'


class Home extends Component {


  state = {

    posts : [],
    sortChoice : "voteHigh",
    openAdd : false,
    comments : [],
    openEdit : false,
    editPost : {}

  }

  componentWillMount(){
    this.props.getCategories()
    this.props.getPosts()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.posts && !nextProps.comments){
      this.findComments(nextProps.posts)
    }
    this.setState( (prevState) => {
      let newComments = [];
      if(nextProps.comments){
        newComments = prevState.comments.concat(nextProps.comments)
      }
      return {
        posts : nextProps.posts,
        comments : newComments
      }
    })
  }

  getCommentsForPosts = (post) => {
    this.state.comments
  }


  findComments = (posts) => {
    for(let post of posts){
      this.props.getComments(post.id)
    }
  }

  sortComments = (post) => {
   const comments = this.state.comments.filter((comment) => comment.parentId === post)
   return comments.length
  }

  modalToggle = (option, post={}) => {
    if(this.state[option]){
      var change = false;
    }else{
      var change = true;
    }

    this.setState({
      [option] : change,
      editPost : post
    })

  }


  addPost = (e,info) => {
    e.preventDefault()
    this.props.createPost(info)
    this.modalToggle("openAdd")

  }

  editPost = (e, post) => {
    e.preventDefault()
    this.props.editPostHome(post)
    this.modalToggle("openEdit")
  }



  upPostVote = (post) =>{
    this.props.votePost(post, "upVote")

  }

  downPostVote = (post) =>{
    this.props.votePost(post, "downVote")

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

                      <span> Comment Count: {this.sortComments(post.id)}</span>
                    ) : (
                      null
                    )}
                    <div className="post-voting">

                      <span><button type="button" onClick={() => this.upPostVote(post.id)}>""</button></span>

                      <span>{post.voteScore}</span>

                      <span><button className="post-voting-down" type="button" onClick={() => this.downPostVote(post.id)}>""</button></span>
                    </div>
                    <div className="post-buttons">
                        <div>
                          <button type="button" >Delete Post</button>
                        </div>
                        <div>
                          <button type="button" onClick={() => this.modalToggle("openEdit", post)}>Edit Post</button>
                        </div>
                    </div>
                  </div>

                </li>
              })
              ) : (
              null
              )
            }
          </ul>
          <button type="button" onClick={() => this.modalToggle("openAdd")}>Add Post</button>
          <div>
            <Modal
              isOpen={this.state.openEdit}
              onRequestClose={() => this.modalToggle("openEdit")}
              contentLabel="Modal"
              >
              <EditPostForm body={this.state.editPost.body} title={this.state.editPost.title} id={this.state.editPost.id} change={this.editPost} />
            </Modal>
          </div>
          <Modal
            isOpen={this.state.openAdd}
            onRequestClose={() => this.modalToggle("openAdd")}
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
    editPostHome : post => dispatch(editPostHome(post)),
    votePost : (post, option) => dispatch(votePostHome(post,option))


  }
}





export default connect( mapStateToProps,mapDispatchToProps)(Home)