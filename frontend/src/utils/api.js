const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'token',
  'Content-Type': 'application/json'
}

export const getAllCategories = () =>
   fetch(`${api}/categories`, { headers })
     .then(res => res.json())
     .then(data => data.categories)

export const getAllPosts = () =>
   fetch(`${api}/posts`, { headers })
     .then(res => res.json())
     .then(data => data)

export const createNewPost = (post) => 
   fetch(`${api}/posts`, { headers, method : "POST" , body: JSON.stringify(post)})
     .then(res => res.json())
     .then(data => data)
 
 export const postsForCategory = (category) => 
   fetch(`${api}/${category}/posts`, { headers} )
     .then(res => res.json())
     .then(data => data)
 

 export const getOnePost = (post) => 
   fetch(`${api}/posts/${post}`, { headers} )
     .then(res => res.json())
     .then(data => data)


 export const commentsForPost = (post) => 
   fetch(`${api}/posts/${post}/comments`, { headers} )
     .then(res => res.json())
     .then(data => data)
 

export const removePost = (post) => 
   fetch(`${api}/posts/${post}`, { headers, method : "DELETE"} )
     .then(res => res.json())
     .then(data => data)

export const editPost = (post) => 
   fetch(`${api}/posts/${post.id}`, { headers, method : "PUT", body: JSON.stringify(post)} )
     .then(res => res.json())
     .then(data => data)


export const addComment = (comment) => 
   fetch(`${api}/comments`, { headers, method : "POST" , body: JSON.stringify(comment)})
     .then(res => res.json())
     .then(data => data)


export const deleteComment = (comment) => 
   fetch(`${api}/comments/${comment}`, { headers, method : "DELETE"} )
     .then(res => res.json())
     .then(data => data)


export const editComment = (comment) => 
   fetch(`${api}/comments/${comment.id}`, { headers, method : "PUT", body: JSON.stringify(comment)} )
     .then(res => res.json())
     .then(data => data)
 

export const voteComment = (comment, vote) => 
   fetch(`${api}/comments/${comment}`, { headers, method : "POST", body : JSON.stringify({option:vote})} )
     .then(res => res.json())
     .then(data => data)

export const votePost = (post, vote) => 
   fetch(`${api}/posts/${post}`, { headers, method : "POST", body : JSON.stringify({option:vote})} )
     .then(res => res.json())
     .then(data => data)

