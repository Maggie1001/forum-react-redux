import {combineReducers} from 'redux'

import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  RECEIVE_POSTS,
  GET_POST,
  RECEIVE_CATEGORIES,
  GET_CATEGORY
} from '../actions'

const initialState = {}

function post(state = initialState, action) {
  
  const {post} = action
  switch(action.type){
    case ADD_POST :
      let finalPosts = state.posts.concat(post)
      return{
        posts : finalPosts
      }
    // case DELETE_POST :
    //   return state.filter((p)=> (
    //     p.id !== post.id
    //   ))
    // case UPDATE_POST :
    //   let updatedState = state.filter((p)=> (
    //     p.id !== post.id
    //   ))
    //   return {
    //     ...updatedState,
    //     post
    //   }
    case GET_POST :
      return{
        post
      }
    case RECEIVE_POSTS : 
    let posts = action.posts.sort((a,b) => {
        const keyA = a.voteScore
        const keyB = b.voteScore;
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    })
      return{
        posts : posts
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







export default combineReducers({
  post, category
})


