export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'

export function addPost ({ category, post }) {
  return {
    type: ADD_POST,
    category,
    post,
  }
}

export function deletePost ({ post }) {
  return {
    type: DELETE_POST,
    post
  }
}

export function updatePost ({post}){
  return{
    type: UPDATE_POST,
    post
  }
}