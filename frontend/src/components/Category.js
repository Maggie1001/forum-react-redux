import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter, Route } from 'react-router-dom'
import Modal from 'react-modal'
import { getCategory, votePostHome, postsByCategory, editPostHome, getComments, deletePost} from '../actions/index.js'
import EditPostForm from './editPostForm'



class Category extends Component {


  state = {

    posts : [],
    sortChoice : "voteHigh",
    openAdd : false,
    comments : [],
    openEdit : false,
    editPost : {}

  }

  componentDidMount(){
    let category = this.props.match.params.category
    this.props.getPostCategories(category)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.posts && !nextProps.comments){
      this.findComments(nextProps.posts)
    }
    this.setState( (prevState) => {
      let newComments = [];
      let newPosts = [];
      if(nextProps.comments){
        newComments = prevState.comments.concat(nextProps.comments)
      }
      if(this.isObject(nextProps.posts)){
        newPosts = [];
      }else{
        newPosts = nextProps.posts
      }

      return {
        posts : newPosts,
        comments : newComments
      }
    })
  }


  sortPosts = (e) => {
    let posts;
    if(e.target.value === "voteHigh"){
      posts = this.props.posts.sort((a,b) => {
          const keyA = a.voteScore;
          const keyB = b.voteScore;
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
      })
    }else if(e.target.value === "voteLow"){
      posts =  this.props.posts.sort((a,b) => {
          const keyA = a.voteScore;
          const keyB = b.voteScore;
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
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

  findComments = (posts) => {
    for(let post of posts){
      this.props.getComments(post.id)
    }
  }

  isObject = (item) => {
    return item && typeof item === 'object' && item.constructor === Object;
  }

  sortComments = (post) => {
   const comments = this.state.comments.filter((comment) => comment.parentId === post)
   return comments.length
  }

  upPostVote = (post) =>{
    this.props.votePost(post, "upVote")

  }

  downPostVote = (post) =>{
    this.props.votePost(post, "downVote")

  }

  deletePost = (post) => {   
    this.props.deletePost(post)
  }


  editPost = (e, post) => {
    e.preventDefault()
    this.props.editPostHome(post)
    this.modalToggle("openEdit")
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




  render() {
    
    return (
      <div className="category-wrapper">
        {this.props.match.params.category ? (
            <h1>{this.props.match.params.category}</h1>

        ) : (

          null

        )
      }
      <div className="home-select">
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
                      <button type="button" onClick={() => this.deletePost(post.id)}>Delete Post</button>
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
          <div>
            <Modal
              isOpen={this.state.openEdit}
              onRequestClose={() => this.modalToggle("openEdit")}
              contentLabel="Modal"
              >
              <EditPostForm body={this.state.editPost.body} title={this.state.editPost.title} id={this.state.editPost.id} change={this.editPost} />
            </Modal>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state,props){
  return {
    category : state.category.category,
    posts : state.post.posts,
    comments : state.comment.comments
  }
}

function mapDispatchToProps(dispatch){
  return{

    getPostCategories : category => dispatch(postsByCategory(category)),
    votePost : (post, option) => dispatch(votePostHome(post,option)),
    editPostHome : post => dispatch(editPostHome(post)),
    getComments : post => dispatch(getComments(post)),
    deletePost : post => dispatch(deletePost(post))

  }
}





export default withRouter(connect( mapStateToProps,mapDispatchToProps)(Category))

