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
 

 //figure out how to write create new post method

 //move up all mounting stuff to app so that when app renders it passes all information to home

 //make add action in reducer work
