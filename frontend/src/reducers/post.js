import {ADD_POST,
CREATE_POST ,
RECEIVE_POSTS,
CATEGORY_POSTS,
GET_POST,
GRAB_POST ,
REMOVE_POST ,
MODIFY_POST ,
HOME_VOTE_POST,
GONE_POST,
GRAB_COMMENTS ,
NEW_COMMENT,
REMOVE_COMMENT ,
MODIFY_COMMENT,
GET_CATEGORY,
RECEIVE_CATEGORIES} from '../actions/actionTypes.js'

const initialState = {}

export const post = function(state = initialState, action) {


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
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
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


