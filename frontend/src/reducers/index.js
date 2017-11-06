import {combineReducers} from 'redux'

import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  RECEIVE_POSTS,
  GRAB_POST,
  RECEIVE_CATEGORIES,
  GET_CATEGORY,
  CATEGORY_POSTS,
  GRAB_COMMENTS,
  REMOVE_POST,
  MODIFY_POST,
  NEW_COMMENT,
  REMOVE_COMMENT,
  MODIFY_COMMENT,
  HOME_VOTE_POST,
  GONE_POST
} from '../actions'

const initialState = {}

function post(state = initialState, action) {

  const {post} = action
  switch(action.type){
    case ADD_POST :
      let newPosts = state.posts.slice(0)
      let finalPosts = newPosts.concat(post)
      return{
        posts : finalPosts
      }
    case GRAB_POST :
      return{
        post
      }
    case RECEIVE_POSTS : 
    let posts = action.posts.sort((a,b) => {
        const keyA = a.voteScore
        const keyB = b.voteScore;
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
    })
      return{
        posts : posts
      }
    case CATEGORY_POSTS :
    let categoryPosts = action.posts.sort((a,b) => {
        const keyA = a.voteScore
        const keyB = b.voteScore;
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    })
    return{
      posts : categoryPosts
    }
    case REMOVE_POST :
      let removePosts = state.posts.slice(0).filter(entry => entry.id !== post.id)
      return {
        posts : removePosts
      }
    case GONE_POST:
      return {
        posts : post
      }
    case MODIFY_POST :
      return{
        post 
      }
    case HOME_VOTE_POST:
      let editablePosts = state.posts.slice(0)
      let editedPosts = editablePosts.filter((post) => post.id !== action.post.id).concat(action.post)
      let donePosts = editedPosts.sort((a,b) => {
          const keyA = a.voteScore
          const keyB = b.voteScore;
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
      }) 
      return{
        posts : editedPosts
      }
    default :
      return state
  }


}

function category(state = initialState, action){


  const {category} = action

  switch(action.type){
    case RECEIVE_CATEGORIES :
      return {
        categories : action.categories
      }
    case GET_CATEGORY :
      return {
        category
      }
    default :
      return state

  }


}


function comment(state = initialState, action){

  const {comment} = action
  switch(action.type){
    case GRAB_COMMENTS :
      let orderedComments = action.comments.sort((a,b) => {
          const keyA = a.voteScore
          const keyB = b.voteScore;
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
      })
      return {
        comments : orderedComments
      }
    case NEW_COMMENT :
      let moreComments = state.comments.slice(0)
      let finalComments = moreComments.concat(comment)
      return {
        comments : finalComments
      }
    case REMOVE_COMMENT :
      let filterableComments = state.comments.slice(0)
      let filteredComments = filterableComments.filter((comment) => comment.id !== action.comment)
      return{
        comments : filteredComments
      }
    case MODIFY_COMMENT :  
      let editableComments = state.comments.slice(0)
      let editedComments = editableComments.filter((comment) => comment.id !== action.comment.id).concat(action.comment)
      let newComments = editedComments.sort((a,b) => {
          const keyA = a.voteScore
          const keyB = b.voteScore;
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
      }) 
      return{
        comments :  newComments
      }
    default :
      return state

  }


}






export default combineReducers({
  post, category, comment
})


