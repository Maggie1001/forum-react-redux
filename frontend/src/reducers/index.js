import {combineReducers} from 'redux'

import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  RECEIVE_CATEGORIES
} from '../actions'

const initialState = {}

function post(state = initialState, action) {
  const {post} = action


  switch(action.type){
    case ADD_POST :
      return{
        ...state,
        post
      }
    case DELETE_POST :
      return state.filter((p)=> (
        p.id !== post.id
      ))
    case UPDATE_POST :
      let updatedState = state.filter((p)=> (
        p.id !== post.id
      ))
      return {
        ...updatedState,
        post
      }
    case RECEIVE_CATEGORIES :
      return {
        post
      }
    default :
      return state
  }


}


export default combineReducers({
  post,
})