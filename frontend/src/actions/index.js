import * as APIUtil from '../utils/api';

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const ADD_POST = 'ADD_POST'
export const CREATE_POST = 'CREATE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const CATEGORY_POSTS = 'CATEGORY_POSTS'
export const GET_POST = 'GET_POST'
export const GRAB_POST = 'GRAB_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const MODIFY_POST = 'MODIFY_POST'

export const GRAB_COMMENTS = 'GRAB_COMMENTS'
export const NEW_COMMENT = 'NEW_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const MODIFY_COMMENT = 'MODIFY_COMMENT'

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


export const deletePost = post => dispatch => (
 APIUtil.removePost(post)
 .then(post => dispatch(removePost(post)))
);

export const modifyPost = (post) => ({

  type: MODIFY_POST,
  post

});

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


