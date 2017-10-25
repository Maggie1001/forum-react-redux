import * as APIUtil from '../utils/api';

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const ADD_POST = 'ADD_POST'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST = 'GET_POST'

export const GET_CATEGORY = 'GET_CATEGORY'

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const getAllCategories = (dispatch) => () => {
  APIUtil
    .getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
};

export const getCategory = (category) => ({
  type: GET_CATEGORY,
  category
});



export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getAllPosts = (dispatch) => () => {
  APIUtil
    .getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))

};

export const getPost = (post) => ({
  type: GET_POST,
  post
});




export const createPost = (post) => ({

  type: ADD_POST,
  post

});


export const addPost = post => dispatch => (
 APIUtil.createNewPost(post)
 .then(post => dispatch(createPost(post)))
);

