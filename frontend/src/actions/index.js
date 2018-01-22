import * as APIUtil from '../utils/api';

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
RECEIVE_CATEGORIES} from './actionTypes.js'

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

export const categoryPosts = (posts) => ({
  type: CATEGORY_POSTS,
  posts
});


export const postsByCategory = category => dispatch => (
 APIUtil.postsForCategory(category)
 .then(posts => dispatch(categoryPosts(posts)))
);



export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getAllPosts = (dispatch) => () => {
  APIUtil
    .getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))

};

export const grabPost = (post) => ({
  type: GRAB_POST,
  post
});



export const getPost = post => dispatch => (

 APIUtil.getOnePost(post)
 .then(post => dispatch(grabPost(post)))
);


export const grabComments = (comments) => ({
  type: GRAB_COMMENTS,
  comments
});

export const getComments = post => dispatch =>(

 APIUtil.commentsForPost(post)
 .then(comments => dispatch(grabComments(comments)))
);





export const createPost = (post) => ({

  type: ADD_POST,
  post

});


export const addPost = post => dispatch => (
 APIUtil.createNewPost(post)
 .then(post => dispatch(createPost(post)))
);


export const removePost = (post) => ({

  type: REMOVE_POST,
  post

});


export const gonePost = (post) => ({

  type: GONE_POST,
  post

});

export const deletePost = post => dispatch => (
 APIUtil.removePost(post)
 .then(post => dispatch(removePost(post)))
);

export const vanquishPost = post => dispatch => (
 APIUtil.removePost(post)
 .then(post => dispatch(gonePost(post)))
);


export const modifyPost = (post) => ({

  type: MODIFY_POST,
  post

});

export const editPostHome = post => dispatch => (
 APIUtil.editPost(post)
 .then(post => dispatch(homeVotePost(post)))
);

export const editPost = post => dispatch => (
 APIUtil.editPost(post)
 .then(post => dispatch(modifyPost(post)))
);

export const newComment = (comment) => ({

  type: NEW_COMMENT,
  comment


});

export const addComment = comment => dispatch => (
 APIUtil.addComment(comment)
 .then(post => dispatch(newComment(comment)))
);

export const removeComment = (comment) => ({

  type: REMOVE_COMMENT,
  comment


});

export const deleteComment = comment => dispatch => (
 APIUtil.deleteComment(comment)
 .then(post => dispatch(removeComment(comment)))
);



export const modifyComment = (comment) => ({

  type: MODIFY_COMMENT,
  comment


});


export const editComment = comment => dispatch => (
 APIUtil.editComment(comment)
 .then(comment => dispatch(modifyComment(comment)))
);



export const vote = (comment,vote) => dispatch => (
  APIUtil.voteComment(comment, vote)
 .then(comment => dispatch(modifyComment(comment)))
);

export const votePost = (post, vote) => dispatch => (
 APIUtil.votePost(post, vote)
 .then(post => dispatch(modifyPost(post)))
);


export const homeVotePost = (post) => ({

  type: HOME_VOTE_POST,
  post


});


export const votePostHome = (post, vote) => dispatch => (
 APIUtil.votePost(post, vote)
 .then(post => dispatch(homeVotePost(post)))
);


