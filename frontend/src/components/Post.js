import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { getPost, getComments, vanquishPost, editPost, addComment, deleteComment, editComment, vote, votePost } from '../actions/index.js'
import Modal from 'react-modal'
import EditPostForm from './editPostForm'
import AddCommentForm from './AddCommentForm'
import EditCommentForm from './EditCommentForm'


class Post extends Component {

  state = {
    openEdit : false,
    openAdd : false,
    openEditComment: false,
    comment : ""
  }


  componentDidMount(){
    let post = this.props.match.params.post
    this.props.getPost(post)
    this.props.getComments(post)
  }



  deletePost = (post) => {
    this.props.deletePost(this.props.match.params.post)
    this.props.history.push('/')
  }

  editPost = (e, post) => {
    e.preventDefault()
    this.props.editPost(post)
    this.modalToggle("openEdit")
  }

  addComment = (e, comment) =>{
    e.preventDefault()
    this.props.addComment(comment)
    this.modalToggle("openAdd")
  }

  deleteComment = (comment) => {   
    this.props.deleteComment(comment)
  }

  editComment = (e, comment) => {
    e.preventDefault()
    this.props.editComment(comment)
    this.modalToggle("openEditComment")
  }

  upVote = (comment) =>{
    this.props.vote(comment, "upVote")

  }

  downVote = (comment) =>{
    this.props.vote(comment, "downVote")

  }

  upPostVote = () =>{
    this.props.votePost(this.props.post.id, "upVote")

  }

  downPostVote = () =>{
    this.props.votePost(this.props.post.id, "downVote")

  }

  notFound = () => {
    this.props.history.push('/404')
  }


  modalToggle = (option,comment="") => {
    if(this.state[option]){
      var change = false;
    }else{
      var change = true;
    }



    this.setState({
      [option] : change,
      comment : comment 
    })

  }

  render() {
    if(this.props.post && (this.props.post.error || Object.values(this.props.post).length === 0)){
      this.notFound();
    }
    let timestamp = ""
    if(this.props.post){
      let date = new Date(this.props.post.timestamp*1000)
      let hours = date.getHours();
      let minutes = minutes = "0" + date.getMinutes();
      let seconds = "0" + date.getSeconds();
      timestamp = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    return (
      <div>
        {this.props.post ? (
          <div>
            <div className="post-info">
              <span>Author: {this.props.post.author}</span>
              <span>Title: {this.props.post.title}</span>
              <span> Timestamp: {timestamp}</span>
            </div>

            <div className="post-body">
              <div className="post-voting">

                <span><button type="button" onClick={this.upPostVote}>""</button></span>

                <span>{this.props.post.voteScore}</span>

                <span><button className="post-voting-down" type="button" onClick={this.downPostVote}>""</button></span>
              </div>

              <span >{this.props.post.body}</span>
              
            </div>
            <div className="post-buttons">
                <div>
                  <button type="button" onClick={this.deletePost}>Delete Post</button>
                </div>
                <div>
                  <button type="button" onClick={() => this.modalToggle("openEdit")}>Edit Post</button>
                </div>
                <div>
                  <button type="button" onClick={() => this.modalToggle("openAdd")}>Comment</button>
                </div>
            </div>



            <div>
                <Modal
                  isOpen={this.state.openEdit}
                  onRequestClose={() => this.modalToggle("openEdit")}
                  contentLabel="Modal"
                >
                  <EditPostForm body={this.props.post.body} title={this.props.post.title} id={this.props.post.id} change={this.editPost} />
                </Modal>
            </div>
            <div>
                <Modal
                  isOpen={this.state.openAdd}
                  onRequestClose={() => this.modalToggle("openAdd")}
                  contentLabel="Modal"
                >
                  <AddCommentForm parentID={this.props.post.id}  change={this.addComment} />
                </Modal>
            </div>
          </div>

        ) : (

          null

        )
      }

        <ul className="comments">
          <div>
            {this.props.comments ? (

              <span> Comment Count: {this.props.comments.length}</span>
              ) : (
                null
              )}
            </div>
           {this.props.comments ? (
              this.props.comments.map((comment) => {
                return <li key={comment.id}>
                <div className="comment-body">
                    <div className="post-voting">
                      <span><button type="button" onClick={(id) => this.upVote(comment.id)}>""</button></span>

                      <span>{comment.voteScore}</span>

                      <span><button className="post-voting-down" type="button" onClick={(id) => this.downVote(comment.id)}>""</button></span>

                    </div>

                    <span>{comment.body}</span>

                  </div>
                  <span>{comment.author}</span>

                  <div className="comment-buttons">
                  <div>
                    <button type="button"  onClick={(id) => this.deleteComment(comment.id)}>Delete Comment</button>
                  </div>

                  <div>
                    <button type="button"  onClick={() => this.modalToggle("openEditComment", comment)}>Edit Comment</button>
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
                isOpen={this.state.openEditComment}
                onRequestClose={() => this.modalToggle("openEditComment")}
                contentLabel="Modal">
                <EditCommentForm body={this.state.comment.body} id={this.state.comment.id} voteCount={this.state.comment.voteCount}  change={this.editComment} />
              </Modal>
            </div>
      </div>
    );
  }
}

function mapStateToProps(state,props){
  return {
    post : state.post.post,
    comments : state.comment.comments
  }
}

function mapDispatchToProps(dispatch){
  return{

    getPost : post => dispatch(getPost(post)),
    getComments : post => dispatch(getComments(post)),
    deletePost : post => dispatch(vanquishPost(post)),
    editPost : post => dispatch(editPost(post)),
    addComment : comment => dispatch(addComment(comment)),
    deleteComment : comment => dispatch(deleteComment(comment)),
    editComment : comment => dispatch(editComment(comment)),
    vote : (comment, option) => dispatch(vote(comment,option)),
    votePost : (post, option) => dispatch(votePost(post,option))

  }
}





export default connect( mapStateToProps,mapDispatchToProps)(Post)