import {combineReducers} from 'redux'
import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST
} from '../actions'


const initialCategoryState = {
  kudler : "Cool"
}




function post(state = initialCategoryState, action) {
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
      return{
        ...updatedState,
        post
      }

    default :
      return state
  }


}


export default post